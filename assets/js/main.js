$(function () {
  function updatePressed(selector) {
    $(selector).each(function () {
      $(this).attr('aria-pressed', $(this).hasClass('active') ? 'true' : 'false');
    });
  }

  const config = window.SUPABASE_CONFIG;
  const supabaseClient = config && window.supabase
    ? window.supabase.createClient(config.url, config.publishableKey)
    : null;

  $('#contact-form').on('submit', async function (event) {
    event.preventDefault();
    const form = this;
    const submitButton = $(form).find('[type="submit"]');
    const success = $('#form-success');
    success.addClass('d-none');

    if (!form.checkValidity()) {
      form.reportValidity();
      form.classList.add('was-validated');
      return;
    }

    if (!supabaseClient) {
      alert('No se pudo conectar con el formulario. Inténtalo de nuevo más tarde.');
      return;
    }

    const fields = $(form).find('input, select, textarea');
    submitButton.prop('disabled', true).text('Enviando...');
    const { error } = await supabaseClient.from('quote_requests').insert({
      full_name: fields.eq(0).val().trim(),
      phone: fields.eq(1).val().trim(),
      email: fields.eq(2).val().trim(),
      job_type: fields.eq(3).val(),
      details: fields.eq(4).val().trim(),
      source: 'website'
    });

    submitButton.prop('disabled', false).html('Enviar solicitud <i class="bi bi-arrow-right ms-2"></i>');
    if (error) {
      alert('No pudimos enviar tu solicitud. Inténtalo nuevamente o contáctanos por WhatsApp.');
      return;
    }

    form.reset();
    form.classList.remove('was-validated');
    success.removeClass('d-none').attr('role', 'status');
  });

  $('.portfolio-filters button').on('click', function () {
    const filter = $(this).data('filter');
    $('.portfolio-filters button').removeClass('active');
    $(this).addClass('active');
    $('.work-item').each(function () {
      $(this).toggle(filter === 'all' || $(this).data('category') === filter);
    });
    updatePressed('.portfolio-filters button');
  });

  $('.navbar-nav .nav-link').on('click', function () {
    $('.navbar-nav .nav-link').removeClass('active');
    $(this).addClass('active');
    const menu = document.querySelector('.navbar-collapse');
    if (menu && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });

  updatePressed('.portfolio-filters button');
});
