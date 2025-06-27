document.addEventListener('DOMContentLoaded', function() {
    // Contador de visitantes aleatório
    setInterval(function() {
        const currentCount = parseInt(document.getElementById('visitor-count').textContent);
        const newCount = currentCount + Math.floor(Math.random() * 3) + 1;
        document.getElementById('visitor-count').textContent = newCount;
    }, 5000);

    // Contador regressivo
    let timeLeft = 30 * 60; // 30 minutos em segundos
    const countdownElement = document.getElementById('countdown');
    
    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdownElement.textContent = `${minutes}:${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = "00:00";
            document.querySelector('.timer').style.color = "#ff0000";
            document.querySelector('.timer').style.fontWeight = "bold";
        } else {
            timeLeft--;
        }
    }
    
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Slider de depoimentos
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + testimonials.length) % testimonials.length;
        testimonials[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-avance do slider
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Efeito de digitação no título (opcional)
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
        }
    }, 50);

    // Animação de scroll suave para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito parallax nas seções
    const parallaxSections = document.querySelectorAll('[class*="section"]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const bg = section.querySelector('::before');
            if (bg) {
                const speed = 0.3;
                const yPos = -(scrollPosition * speed);
                bg.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // Botão CTA pulsante
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    setInterval(() => {
        ctaButtons.forEach(button => {
            button.classList.toggle('pulse');
        });
    }, 2000);

    // Simular clique no vídeo placeholder
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Aqui você pode adicionar o código para abrir um modal com o vídeo real
            alert('Vídeo de depoimento será exibido aqui!');
        });
    }
});

// JavaScript para o Relógio Funcional - Versão Corrigida e Aprimorada
document.addEventListener('DOMContentLoaded', function() {
    // Tempo desde que o usuário entrou na página
    const startTime = new Date();
    
    // Elementos do DOM
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const damageElement = document.querySelector('.damage-indicator');
    const ctaButton = document.querySelector('.cta-button');
    
    // Configuração inicial
    let damagePercentage = 70; // Começa em 70%
    damageElement.style.setProperty('--damage', `${damagePercentage}%`);

    // Atualiza todos os elementos do relógio
    function updateClock() {
        const now = new Date();
        const elapsed = new Date(now - startTime);
        
        // Atualiza relógio digital
        const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
        const hours = elapsed.getUTCHours();
        const minutes = elapsed.getUTCMinutes();
        const seconds = elapsed.getUTCSeconds();
        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Atualiza relógio analógico
        updateAnalogClock(now);
        
        // Aumenta o dano a cada minuto completo
        if (seconds === 0) {
            damagePercentage = Math.min(damagePercentage + 0.5, 95);
            damageElement.style.setProperty('--damage', `${damagePercentage}%`);
            
            // Atualiza mensagens de urgência a cada 5 minutos
            if (minutes % 5 === 0) {
                updateUrgencyMessages(minutes);
            }
        }
    }
    
    // Relógio analógico
    function updateAnalogClock(now) {
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours() % 12;
        
        const secondHand = document.querySelector('.second-hand');
        const minuteHand = document.querySelector('.min-hand');
        const hourHand = document.querySelector('.hour-hand');
        
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        const minsDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
        const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
        
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minsDegrees}deg)`;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }
    
    // Mensagens de urgência dinâmicas
    function updateUrgencyMessages(minutesElapsed) {
        const urgencyMessages = [
            "O interesse dela diminui a cada minuto!",
            "Você está perdendo a janela de oportunidade!",
            "A cada hora, as memórias positivas se apagam!",
            "Ela pode começar a superar você agora mesmo!"
        ];
        
        const randomMessage = urgencyMessages[Math.floor(Math.random() * urgencyMessages.length)];
        document.querySelector('.subtitle').textContent = randomMessage;
        
        // Efeito de destaque
        const subtitle = document.querySelector('.subtitle');
        subtitle.style.color = '#ff0000';
        setTimeout(() => {
            subtitle.style.color = '#ccc';
        }, 2000);
    }
    
    // Efeito de pulso no CTA
    function pulseCTA() {
        ctaButton.classList.toggle('pulse');
        
        // Muda a cor do gradiente periodicamente
        const colors = [
            'linear-gradient(to right, #ff0000 0%, #ff3333 100%)',
            'linear-gradient(to right, #ff3333 0%, #ff0000 100%)',
            'linear-gradient(to right, #ff0000 0%, #ff6b6b 100%)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        ctaButton.style.background = randomColor;
    }
    
    // Inicia os relógios
    setInterval(updateClock, 1000);
    setInterval(pulseCTA, 2000);
    
    // Atualiza imediatamente para evitar atraso inicial
    updateClock();
    
    // Efeito especial ao passar o mouse no relógio
    document.querySelector('.analog-clock').addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.8)';
    });
    
    document.querySelector('.analog-clock').addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 0 0 10px rgba(255,0,0,0.3), 0 0 50px rgba(255,0,0,0.5)';
    });
  

    // Efeito de pulso no CTA
    setInterval(() => {
        const ctaButton = document.querySelector('.cta-button');
        ctaButton.classList.toggle('pulse');
    }, 2000);
});

// JavaScript para a Seção de Especialistas
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de pulso no CTA
    setInterval(() => {
        document.querySelector('.cta-button').classList.toggle('pulse');
    }, 2000);
    
    // Animação ao aparecer na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.expert-card').forEach(card => {
        observer.observe(card);
    });
    
    // Play no vídeo (simulação)
    document.querySelector('.play-button').addEventListener('click', function() {
        // Substituir por código real de abertura de vídeo
        alert('Abrir vídeo do especialista');
    });
    
    // Efeito hover nos cards
    document.querySelectorAll('.expert-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(255,0,0,0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        });
    });
});
// JavaScript para animar os números
document.addEventListener('DOMContentLoaded', function() {
  const statValues = document.querySelectorAll('.stat-value');
  
  statValues.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const suffix = stat.textContent.includes('%') ? '%' : '';
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      stat.textContent = Math.floor(current) + suffix;
    }, 16);
  });
  
  // Efeito de pulso no botão CTA
  setInterval(() => {
    document.querySelector('.cta-button').classList.toggle('pulse');
  }, 2000);
});