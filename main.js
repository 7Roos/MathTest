/* Abre e fecha o menu quando clicar no ícone */

const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

/*addEventListener é adiciona um evento ouvinte. Um evento que fica "ouvindo".*/
for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}
/*Ei nav! Na sua lista de nav tem um 'show'? Não tem. Então coloca (e vice-versa). Quando? Quando executar uma função. Que função? Essa função será executada quando eu der o click? Quando der o click em quem? No elemento. Quem é o elemento? É o toggle.*/

/* Quando clicar em um ítem do menu, esconder o menu*/

const links = document.querySelectorAll('nav ul li a')
/*Ei! Pesquisou por todos os seletores que eu falei aqui 'nav ul li a'? Então atribui a estes links.*/
for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}
/* Para cada constante link, atribui os 'links'. Para cada link, eu preciso adicionar um evento de click, esse evento vai rodar uma função. E esta lista vai pegar da lista do nav ele vai remover a classe show*/

/*mudar o header da página quando der scroll */

/* É interessante deixar pra fora os const, pois daía função executa só a função e não fica buscando estes elementos toda hora. As vezes dependendo da nossa lógica, precisaremos que a função fique buscando estes elem. aqui não é o caso hoje. */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight
/*Como o evento de scroll ocorre na janela inteira, vou adicionar um evento no window*/

/*Quando tiver um evento de scroll ele terá que rodar uma funcionalidade, que ocorrerá quando  */
/*o scroll passar da altura do header. Que será adicionar a classe scroll no header Senão... */
window.addEventListener('scroll', function () {
  if (window.scrollY >= navHeight) {
    header.classList.add('scroll')
  } else {
    header.classList.remove('scroll')
  }
})
/*Quando tiver um evento de scroll ele terá que rodar uma funcionalidade, que ocorrerá quando  */

/* ScrollReveal: Mostrar elementos quando der scroll na página */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

/* Definimos a origem como no topo, a duração está na unidade de milisegundos, e usamos o reset pra quando o usuário chegar no final e começar a retornar pro topo da página, essa nossa função continuo em loop */

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services .image, #services .text,
  footer .brand, footer .social`,
  { interval: 100 }
)

/* Usamos como marcador de string a crase, por podermos dar enter, e interval marca o intervalo de tempo em milisegundos entre a transição destes dois objetos */

/* Botão voltar pro topo */

const backToTopButton = document.querySelector('.back-to-top')
function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}
//Voltar um pouquinho pra pegar a explicação em 01:00:00.
/* Menu ativo conforme  a seção estiver visível na página */
const sections = document.querySelectorAll('main section[id]')
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/* Podemos agrupar todas as chamadas de funções aqui, pois todas disparam o mesmo evento */
window.addEventListener('scroll', function () {
  backToTop()
  activateMenuAtCurrentSection()
})

/* Tema Dark Mode */
const html = document.querySelector('html')
const checkbox = document.querySelector('input[name = theme]')

const getStyle = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style)

const initialColors = {
  hue: getStyle(html, '--hue'),
  baseColor: getStyle(html, '--base-color'),
  baseColorSecond: getStyle(html, '--base-color-second'),
  baseColorAlt: getStyle(html, '--base-color-alt'),
  titleColor: getStyle(html, '--title-color'),
  textColor: getStyle(html, '--text-color'),
  textColorLight: getStyle(html, '--text-color-light'),
  bodyColor: getStyle(html, '--body-color'),
  bgSecond: getStyle(html, '----bg-second')
}
const darkMode = {
  hue: '240',
  baseColor: 'hsl(var(--hue) 36% 57%',
  baseColorSecond: 'hsl(var(--hue) 5% 0%)',
  baseColorAlt: 'hsl(var(--hue) 87% 100%)',
  titleColor: 'hsl(var(--hue) 41% 100%)',
  textColor: 'hsl(0 0% 86%)',
  textColorLight: 'hsl(0 0% 98%)',
  bodyColor: 'hsl(0 0% 18%)',
  bgSecond: 'hsl(0 0% 15%)'
}

const transformKey = key => '--' + key.replace(/([A-Z])/, '-$1').toLowerCase()

const changeColors = colors => {
  Object.keys(colors).map(key =>
    html.style.setProperty(transformKey(key), colors[key])
  )
}

checkbox.addEventListener('change', ({ target }) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors)
})
