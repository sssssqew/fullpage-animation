let lastScrollLocation = 0
let main = document.querySelector('main')
let sections = main.querySelectorAll('section')
let actions = document.querySelector('.actions')
let links = actions.querySelectorAll('a')
let isDown = null 
let index = 0 
let isChecked = false // 링크 클릭여부

const scroller = new Scroller(false) // 스크롤 객체 생성 

window.addEventListener('scroll', function(){
  scroller.isScrollended()
    .then(result => {
      console.log('scroll ended!')

      let timerId = setTimeout(() => {
        isChecked = false
        clearTimeout(timerId)
        // console.log('isChecked')
      }, 1500)

      
      if(!isChecked){ // 스크롤이 멈춘 경우
        if(isDown){
          index++
        }else{
          index--  
        }
  
        if(index > 4) index = 4
        if(index < 0) index = 0
        
        // console.log(index, links[index])

        links[index].click()
        lastScrollLocation = scroller.getScrollPosition()  // 최근 스크롤 위치 저장
        isDown = null 
        isChecked = true 
        // console.log('click start')

      }
      
    })
    .catch(err => console.log('scrolling...'))

  if(!scroller.getScrollState()){ // 스크롤이 멈춘 경우 

    // 스크롤시 이전, 다음 섹션으로 불연속적으로 이동하기
    if (scroller.getScrollPosition() > lastScrollLocation) {              // 스크롤을 내리는 경우 
      isDown = true                                                          // 다음 메뉴
    } else {                                                              // 스크롤을 올리는 경우            
      isDown = false                                                          // 이전 메뉴
    }
  }
 
  // 전체 애니메이션 제거
  sections.forEach(function(section){
    section.querySelector('span').classList.remove('fadeIn')
  })
  
  // 현재 슬라이드만 애니메이션 추가
  let text = sections[index].querySelector('span')
  text.classList.add('fadeIn')
  
})



