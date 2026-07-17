/**
 * Portfolio JS - Interatividade e Temas
 * Lucas Lago | 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // SELETORES DOM
    // ==========================================
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('section');

    // ==========================================
    // CONTROLE DO TEMA (ESCURO / CLARO)
    // ==========================================
    // Recupera o tema salvo no localStorage ou adota o padrão escuro
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('light-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    // Alternador de tema
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // ==========================================
    // MENU RESPONSIVO (MOBILE)
    // ==========================================
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const isOpened = nav.classList.contains('active');
        menuToggle.querySelector('i').className = isOpened ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Fecha o menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // ==========================================
    // EFEITO STICKY HEADER (SCROLL)
    // ==========================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // SCROLLSPY (DESTAQUE DE NAVEGAÇÃO ATIVA)
    // ==========================================
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // Compensação da altura do cabeçalho

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // FORMULÁRIO DE CONTATO (SIMULAÇÃO)
    // ==========================================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Captura os dados inseridos
            const nameValue = document.getElementById('name').value;
            const emailValue = document.getElementById('email').value;
            const messageValue = document.getElementById('message').value;

            // Altera o estado do botão para simular o envio
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {
                // Sucesso na simulação de envio
                alert(`Obrigado pelo contato, ${nameValue}! Sua mensagem foi simulada com sucesso.\n\nRetornarei no e-mail: ${emailValue}`);
                
                // Reseta o formulário e reativa o botão
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1500);
        });
    }
});
