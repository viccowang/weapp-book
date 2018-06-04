import wepy from 'wepy'
// api
import { getBookState, returnBook, bookDetail } from '@/api/book'

const reg = /^9787[0-9]{9,13}$/

/**
 * 扫码动作封装
 *
 * @returns
 */
function scanCode () {
  return new Promise((resolve, reject) => {
    wepy.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success (res) {
        resolve(res)
      },
      fail (error) {
        reject(error)
      }
    })
  })
}

/**
 * 统一错误处理弹出框
 *
 * @param {any} msg
 */
function showError(msg) {
  wepy.showModal({
    content: msg,
    showCancel: false
  })
}

// 借书
async function scanCodeToBorrowBook (navType) {
  const res = await scanCode()
  if (res) {
    const isbn = res.result
    const bookCode = reg.test(isbn)
    // ISBN码验证
    if (bookCode) {
      wepy.showLoading({title: '正在读取书籍内容...'})
      // 获取当前书是否在公司书库内
      const result = await getBookState({bookIsbn: isbn})
      if (result && result.status) {
        wepy.hideLoading()
        const state = result.status
          // 库里没有该书
        if (state === '0') {
          showError('公司并没有该书可供借阅')
        } else if (state === '1') {
            // 公司有书且可以提供借阅,则跳转到详情页
          wepy[navType]({
            url: `./bookInfo?bookId=${isbn}&readOnly=false`
          })
        } else if (state === '2') {
          showError('Ops!该书已经被借光了.')
        } else { }
      } else {
        showError('图书状态读取失败.')
      }
    } else {
      showError('没有扫到书籍条形码')
    }
  } else {
    wepy.redirectTo({
      url: './index'
    })
  }
}

// 还书
async function scanCodeToReturnBook (navType) {
  const code = await scanCode()
  if (code) {
    const isbn = code.result
    const bookCode = reg.test(isbn)
    const param = {bookIsbn: isbn}
    // 检查当前扫码的书是否是公司内的书
    if (bookCode) {
      // 获取当前书是否在公司书库内
      const bookState = await getBookState(param)
      if (bookState.status !== '0') {
        // 获取图书信息
        const { title } = await bookDetail(param)
        wepy.showModal({
          title: '还书提醒',
          content: `确定要还<${title}>这本书吗?`,
          confirmText: '还书',
          cancelText: '再想想',
          success(res) {
            if (res.confirm) {
              returnBook(param).then(r => {
                wepy[navType]({
                  url: `./turnback?bookId=${isbn}`
                })
              }).catch(error => {
                showError(error)
              })
            }
          }
        })
      }
    } else {
      showError('没有扫到书籍条形码')
    }
  }
}

// 获取书详情
function showBookInfo (isbn) {
  const bookCode = reg.test(isbn)
  if (bookCode) {
    wepy.navigateTo({
      url: `./bookInfo?bookId=${isbn}&readOnly=false`
    })
  } else {
    showError('书籍条形码错误.')
  }
}

export {
  scanCodeToBorrowBook,
  showBookInfo,
  scanCodeToReturnBook
}
