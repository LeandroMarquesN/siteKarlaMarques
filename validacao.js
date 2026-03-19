/**
 * Validação de Formulário com Pop-ups Dinâmicos
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        // Impedimos o envio imediato para validar
        event.preventDefault();

        // 1. Captura dos campos
        const nome = form.querySelector('input[name="nome"]');
        const celular = form.querySelector('input[name="celular"]');
        const dataInput = form.querySelector('input[name="data"]');
        const horario = form.querySelector('input[name="horario"]');
        const indicado = form.querySelector('input[name="indicado"]');

        // --- INÍCIO DAS VALIDAÇÕES ---

        // Validação de Nome
        if (nome.value.trim().length < 3) {
            exibirErro("Nome Inválido", "Por favor, digite seu nome completo.");
            return;
        }

        // Validação de Celular (Verifica se tem os 11 dígitos: DDD + 9 + número)
        const celularLimpo = celular.value.replace(/\D/g, '');
        if (celularLimpo.length < 11) {
            exibirErro("Telefone Incompleto", "Certifique-se de incluir o DDD e o 9 adicional (ex: 11 98888-7777).");
            return;
        }

        // Validação de Data (Não permitir passado)
        const dataSelecionada = new Date(dataInput.value + 'T00:00:00');
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (!dataInput.value) {
            exibirErro("Data Vazia", "Por favor, escolha um dia para o seu atendimento.");
            return;
        } else if (dataSelecionada < hoje) {
            exibirErro("Data Inválida", "Não atendemos em datas que já passaram. Escolha hoje ou um dia futuro.");
            return;
        }

        // Validação de Horário
        if (!horario.value) {
            exibirErro("Horário Ausente", "Escolha a hora que deseja ser atendido.");
            return;
        }

        // Validação de Indicação
        if (indicado.value.trim().length < 2) {
            exibirErro("Campo Indicação", "Diga-nos quem te indicou ou escreva 'Redes Sociais'.");
            return;
        }

        // --- SE CHEGOU AQUI, ESTÁ TUDO OK ---
        Swal.fire({
            title: 'Enviando Agendamento!',
            text: 'Aguarde um instante enquanto processamos...',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            form.submit(); // Envia para o FormSubmit
        });
    });

    // Função auxiliar para exibir o pop-up de erro
    function exibirErro(titulo, mensagem) {
        Swal.fire({
            title: titulo,
            text: mensagem,
            icon: 'error',
            confirmButtonText: 'Corrigir',
            confirmButtonColor: '#0ea5e9' // Cor Sky-500 do seu layout
        });
    }

    // Máscara Automática para o Celular
    celular.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
});