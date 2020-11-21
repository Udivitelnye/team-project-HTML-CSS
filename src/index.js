import "./sass/main.scss";

/* --------mobile MENU------------- */
  const menuBtnRef = document.querySelector("[data-menu-button]");
  const menuBlockRef = document.querySelector("[data-menu-block]");
  const headerRef = document.querySelector("[data-header]");
const bodyRef = document.querySelector("body");
const windowHeight = window.innerHeight;

menuBtnRef.addEventListener("click", () => {
  const { height: menuBlockHeight} = menuBlockRef.getBoundingClientRect();
  const { height: headerHeight } = headerRef.getBoundingClientRect();

// console.log(`menuBlockHeight=`,menuBlockHeight);
//     console.log(`windowHeight=`,windowHeight);

  if (menuBlockHeight === windowHeight) {
    menuBlockRef.removeAttribute('style')
  } else {
    menuBlockRef.style.height = `${windowHeight}px`;
    if (window.innerWidth >= 768) {
      menuBlockRef.style.paddingTop = `${headerHeight}px`;
    }
  }

    const expanded =
      menuBtnRef.getAttribute("aria-expanded") === "true" || false;
    menuBtnRef.setAttribute("aria-expanded", !expanded);

    menuBtnRef.classList.toggle("is-open");
    menuBlockRef.classList.toggle("is-open");
    menuBlockRef.classList.toggle("is-close");
    bodyRef.classList.toggle("mobile-menu-open");
    headerRef.classList.toggle("mobile-menu-open");
  headerRef.classList.toggle("mobile-menu-close");
});

const resizeWindow = () => {
  if (window.innerWidth > 1200 && menuBlockRef.classList.contains("is-open")) {
    menuBtnRef.classList.toggle("is-open");
    menuBlockRef.classList.toggle("is-open");
    menuBlockRef.classList.toggle("is-close");
    bodyRef.classList.toggle("mobile-menu-open");
    headerRef.classList.toggle("mobile-menu-open");
    headerRef.classList.toggle("mobile-menu-close");
    console.log("success");
    console.log(`menuBlockHeight=`,menuBlockHeight);
    console.log(`windowHeight=`,windowHeight);

    const { height: menuBlockHeight} = menuBlockRef.getBoundingClientRect();
  const { height: headerHeight } = headerRef.getBoundingClientRect();

    if (menuBlockHeight === windowHeight) {
      menuBlockRef.removeAttribute('style')
    } else {
        menuBlockRef.style.height = `${windowHeight}px`;
        if (window.innerWidth >= 768) {
          menuBlockRef.style.paddingTop = `${headerHeight}px`;
        }
      }
  }
}
window.addEventListener('resize', resizeWindow);
/* =========================================== */

/* --------MODAL window open/close------------- */
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    backdrop: document.querySelector("[data-backdrop]"),
  };

  if (refs.openModalBtn) {
      refs.openModalBtn.addEventListener("click", toggleModal);
      refs.closeModalBtn.addEventListener("click", toggleModal);
      refs.backdrop.addEventListener('click', onBackdropClick);
  };

  function onBackdropClick(event) {
      if (event.target === event.currentTarget) {
        toggleModal();
      };
  };

  function toggleModal() {
    refs.backdrop.classList.contains("is-hidden")
      ? window.addEventListener('keydown', onPressEscape)
      : window.removeEventListener('keydown', onPressEscape);
    refs.backdrop.classList.toggle("is-hidden");
  };

  function onPressEscape(event) {
    if (event.code === 'Escape') {
      toggleModal();
    };
  };

/* add focus on modal */
  const modalRef = document.querySelector('[data-modal]');

  refs.openModalBtn.addEventListener('click', modalFocus);

  function modalFocus() {
    modalRef.focus();
    modalRef.style.outline = 'none';
  }

/* CHECKBOX-icon in modal add attribute CHECKED */
  const checkboxIconRef = document.querySelector('[data-checkbox-icon]');
  const checkboxInputRef = document.querySelector('[data-checkbox-input]');
  const checkboxLabelRef = document.querySelector('[data-checkbox-label]');


  checkboxLabelRef.addEventListener('click', byClickChecked);
  checkboxIconRef.addEventListener('focus', addEventListenerAddChecked());

  function addEventListenerAddChecked() {
    window.addEventListener('keydown', onPressEnterAdd);
  };

  function onPressEnterAdd(event) {
      if ( event.target.classList.contains('checkbox-icon') && event.code === 'Enter') {
        checkboxInputRef.setAttribute('checked', '');
        checkboxIconRef.classList.add('checked');
        window.removeEventListener('keydown', onPressEnterAdd);
        window.addEventListener('keydown', onPressEnterRemove);
      }
  };

  function onPressEnterRemove(event) {
    if (event.target.classList.contains('checkbox-icon') && event.code === 'Enter') {
      checkboxInputRef.removeAttribute('checked');
      checkboxIconRef.classList.remove('checked');
      window.removeEventListener('keydown', onPressEnterRemove);
      addEventListenerAddChecked();
    }
  };

  function byClickChecked(event) {
    if (event.target.classList.contains('form__text-checkbox') ||
        event.target.classList.contains('checkbox-icon')) {
          if (checkboxInputRef.hasAttribute('checked')) {
          checkboxInputRef.removeAttribute('checked');
          checkboxIconRef.classList.remove('checked');
          addEventListenerAddChecked();
          } else {
          checkboxInputRef.setAttribute('checked', '');
          checkboxIconRef.classList.add('checked');
          window.addEventListener('keydown', onPressEnterRemove);
          };
    };
  };

/* ========================================= */

/* --------FORM in modal window------------- */
  const formModalRef = document.querySelector('[data-form-modal]');

  const takeFormData = event => {
    event.preventDefault();//забороняє браузеру відправляти форму при натисканні кнопки
    // console.dir(event.target.elements); //так можна отримати доступ до елементів форми
    const formRef = event.target;// тут міститься посилання на форму
    const formData = new FormData(formRef);//створюємо новий об'єкт
    const submittedData = {};//об'єкт для збору даних з форми, який надішлеться на бекенд

    formData.forEach((value, key) => {//цей об'єкт просто має ф-цію форіч і дані інпутів у вигляді value та key = name інпута
      submittedData[key] = value;//записуємо дані в об'єкт
    });
    console.dir(submittedData);
  };

  if(formModalRef){
    formModalRef.addEventListener('submit', takeFormData);
  };
/* --------------------- */

