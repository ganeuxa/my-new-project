const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

// Открытие модалки
openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();
  // Устанавливаем фокус на первое поле формы
    dlg.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие по кнопке "Закрыть"
closeBtn.addEventListener('click', () => dlg.close('cancel'));

// Обработка отправки формы
form?.addEventListener('submit', (e) => {
  // Сброс кастомных сообщений об ошибках
    [...form.elements].forEach(el => {
    if (typeof el.setCustomValidity === 'function') {
        el.setCustomValidity('');
    }
});

  // Проверка валидности
    if (!form.checkValidity()) {
    e.preventDefault();

    // Пример кастомного сообщения для email
    const email = form.elements.email;
    if (email?.validity.typeMismatch) {
        email.setCustomValidity('Введите корректный e-mail, например name@example.com');
    }

    // Показываем стандартные подсказки браузера
    form.reportValidity();

    // Подсветка ошибок через ARIA
    [...form.elements].forEach(el => {
        if (el.willValidate) {
            el.toggleAttribute('aria-invalid', !el.checkValidity());
        }
    });

    return;
    }

  // Успешная отправка (без сервера)
    e.preventDefault();
  alert('Спасибо! Ваше сообщение отправлено.'); // или просто закрываем
    form.reset();
    dlg.close('success');
});

// Возвращаем фокус после закрытия
dlg.addEventListener('close', () => {
    lastActive?.focus();
});