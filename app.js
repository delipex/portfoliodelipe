/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC - FELIPE DAMASCENO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CUSTOM CURSOR
    const cursorDot = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    // Smooth follower effect
    function animateCursor() {
        const easing = 0.15;
        followerX += (mouseX - followerX) * easing;
        followerY += (mouseY - followerY) * easing;
        
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Add hover states on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea, .filter-btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hover-interactive');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hover-interactive');
        });
    });

    // 2. MOBILE NAVIGATION MENU
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 3. SCROLL REVEAL (INTERSECTION OBSERVER)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. ACTIVE NAV LINK ON SCROLL
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 150; // offset for nav height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. PORTFOLIO FILTER SYSTEM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400); // matches style transition duration
                }
            });
        });
    });

    // 6. LIGHTBOX / MODAL DETAILS DATA
    const projectsData = {
        'unifan-branding': {
            title: 'UNIFAN Ipirá — Identidade de Campus',
            category: 'Branding / Identidade Visual',
            client: 'Grupo Nobre',
            year: '2023',
            role: 'Lead Designer',
            img: 'docs/unifan_branding_1784291883101.png',
            projectUrl: 'https://www.behance.net/delipedesign',
            desc: 'Projeto gráfico para a nova unidade do Centro Universitário Nobre (UNIFAN) em Ipirá, Bahia. O design reflete modernidade e expansão, englobando a concepção conceitual do logo, paleta cromática vibrante adaptada para ambientes institucionais, sinalização externa e toda a comunicação unificada da marca universitária.'
        },
        'unifan-campaign': {
            title: 'UNIFAN Ipirá — Campanha de Lançamento',
            category: 'Campanhas / Marketing',
            client: 'Grupo Nobre / UNIFAN',
            year: '2023',
            role: 'Diretor de Arte / Marketing',
            img: 'docs/unifan_campaign_1784291895211.png',
            projectUrl: 'https://www.instagram.com/delipedesign/',
            desc: 'Criação e execução de toda a direção de arte e layouts promocionais offline (outdoors estratégicos, flyers e faixas) e digital para o lançamento oficial do campus em Ipirá. A campanha comunicou o conceito de democratização do ensino superior de qualidade e obteve excelente retorno em matrículas.'
        },
        'mauvik-video': {
            title: "Mauvik — 'Não Vai Ser em Vão'",
            category: 'Direção de Arte / Audiovisual',
            client: 'Mauvik (Single)',
            year: '2024',
            role: 'Designer Gráfico / Arte',
            img: 'docs/mauvik_poster_1784291439896.png',
            projectUrl: 'https://www.instagram.com/delipedesign/',
            desc: 'Desenvolvimento criativo e conceitual de peças promocionais, poster e materiais de suporte para o videoclipe oficial do artista Mauvik. O visual evoca uma estética pop indie moderna, combinando tons cinematográficos quentes com forte presença de luz neon.'
        },
        'grupo-nobre-editorial': {
            title: 'Grupo Nobre — Manual de Identidade',
            category: 'Editorial / Brandbook',
            client: 'Grupo Nobre',
            year: '2024',
            role: 'Diretor de Arte',
            img: 'docs/nobre_editorial_1784291449926.png',
            projectUrl: 'https://www.behance.net/delipedesign',
            desc: 'Diagramação, estruturação e projeto de design editorial de ponta para o manual de identidade visual e comunicação corporativa do Grupo Nobre. Um guia limpo, prático e muito visual, planejado para guiar colaboradores e terceiros no uso correto dos padrões institucionais de todas as empresas do grupo.'
        },
        'feather-pencil': {
            title: 'The Feather Pencil — Estudo Vetorial',
            category: 'Ilustração / Affinity Designer',
            client: 'Estudo Pessoal',
            year: '2023',
            role: 'Ilustrador',
            img: 'docs/feather_pencil_1784291460798.png',
            projectUrl: 'https://www.behance.net/delipedesign',
            desc: 'Ilustração vetorial avançada focada no estudo de texturas e transição de formas, representando a fusão entre um lápis clássico de desenho e penas de pássaros. Todo o projeto gráfico foi desenvolvido utilizando ferramentas de precisão vetorial no Affinity Designer.'
        },
        'love-point': {
            title: 'Love Point — Conceito de Marca',
            category: 'Branding / Embalagem',
            client: 'Love Point App',
            year: '2024',
            role: 'Brand Designer',
            img: 'docs/love_point_1784291470092.png',
            projectUrl: 'https://www.behance.net/delipedesign',
            desc: 'Conceito e estudo de identidade visual corporativa, logotipo e embalagens para a marca conceitual "Love Point". O projeto foca em tons pastéis suaves, curvas orgânicas minimalistas e tipografia limpa para construir uma identidade aconchegante, moderna e conectada com seu nicho.'
        }
    };

    // Modal DOM Elements
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-project-img');
    const modalCategory = document.getElementById('modal-project-category');
    const modalTitle = document.getElementById('modal-project-title');
    const modalClient = document.getElementById('modal-project-client');
    const modalYear = document.getElementById('modal-project-year');
    const modalRole = document.getElementById('modal-project-role');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalProjectLink = document.getElementById('modal-project-link');
    
    const closeBtn = document.getElementById('modal-close-btn');
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');
    
    let currentProjectIds = Object.keys(projectsData);
    let activeProjectId = '';

    // Open Modal
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    function openModal(projectId) {
        activeProjectId = projectId;
        const project = projectsData[projectId];
        
        if (!project) return;
        
        modalImg.src = project.img;
        modalImg.alt = project.title;
        modalCategory.textContent = project.category;
        modalTitle.textContent = project.title;
        modalClient.textContent = project.client;
        modalYear.textContent = project.year;
        modalRole.textContent = project.role;
        modalDesc.textContent = project.desc;
        
        if (project.projectUrl) {
            modalProjectLink.href = project.projectUrl;
            modalProjectLink.style.display = 'inline-flex';
        } else {
            modalProjectLink.style.display = 'none';
        }
        
        modal.classList.add('active');
        document.body.classList.add('overflow-hidden');
        modal.setAttribute('aria-hidden', 'false');
    }

    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = ''; // Clear source to stop load transition next time
    }

    closeBtn.addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Modal Nav (Prev / Next)
    function navigateProject(direction) {
        const currentIndex = currentProjectIds.indexOf(activeProjectId);
        let nextIndex = currentIndex + direction;
        
        if (nextIndex < 0) {
            nextIndex = currentProjectIds.length - 1;
        } else if (nextIndex >= currentProjectIds.length) {
            nextIndex = 0;
        }
        
        const nextProjectId = currentProjectIds[nextIndex];
        
        // Smooth transition inside the modal
        modalImg.style.opacity = '0';
        setTimeout(() => {
            openModal(nextProjectId);
            modalImg.style.opacity = '1';
        }, 150);
    }

    prevBtn.addEventListener('click', () => navigateProject(-1));
    nextBtn.addEventListener('click', () => navigateProject(1));

    // Keyboard controls (Esc to close, Left/Right arrow to navigate)
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateProject(-1);
            if (e.key === 'ArrowRight') navigateProject(1);
        }
    });

    // 7. CONTACT FORM SIMULATION
    const contactForm = document.getElementById('portfolio-contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = 'Enviando... <i data-lucide="loader"></i>';
            submitBtn.disabled = true;
            if (window.lucide) lucide.createIcons();
            
            // Simulate API request (1.5s delay)
            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Mensagem enviada com sucesso! Obrigado por entrar em contato.';
                
                // Clear fields
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                if (window.lucide) lucide.createIcons();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1500);
        });
    }

    // 8. BACK TO TOP BUTTON
    const backToTopBtn = document.getElementById('btn-back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Handle initial reveal for elements loaded on viewport
    setTimeout(() => {
        window.scrollTo(window.scrollX, window.scrollY + 1);
    }, 200);
});
