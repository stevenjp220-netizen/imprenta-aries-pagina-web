$(function () {
  const state = { product: 'Tarjetas personales', base: 45, finish: 'Couché mate', multiplier: 1, weight: '300g', cost: 1.35, qty: 100 };
  const format = new Intl.NumberFormat('es-BO');

  function updatePressed(selector) {
    $(selector).each(function () {
      $(this).attr('aria-pressed', $(this).hasClass('active') ? 'true' : 'false');
    });
  }

  function calculate() {
    const width = Math.max(1, Number($('#calc-width').val()) || 9);
    const height = Math.max(1, Number($('#calc-height').val()) || 5);
    const areaRatio = Math.max(0.6, Math.min(6, (width * height) / 45));
    const scales = { 100: 1, 250: 1.7, 500: 2.8, 1000: 4.5, 2500: 9.2 };
    let total = state.base * (areaRatio * .4 + .6) * state.multiplier * state.cost * (scales[state.qty] || 1);

    $('.addon-check input:checked').each(function () {
      total += Number($(this).data('addon')) * (state.qty / 1000 + .8);
    });

    total = Math.round(total);
    $('#total-price').text(format.format(total));
    $('#unit-price').text(`Bs. ${(total / state.qty).toFixed(2)} / unidad`);
    $('#summary-product').text(state.product);
    $('#summary-paper').text(`${state.finish} · ${state.weight}`);
    $('#summary-size').text(`${width} × ${height} cm`);
    $('#summary-qty').text(`${format.format(state.qty)} unidades`);

    const message = `Hola Aries Imprenta, deseo cotizar ${state.product}, ${state.finish} ${state.weight}, medida ${width} × ${height} cm, ${state.qty} unidades. Estimado: Bs. ${total}.`;
    $('#whatsapp-quote').attr('href', `https://wa.me/59176992817?text=${encodeURIComponent(message)}`);
  }

  $('.choice-btn').on('click', function () {
    const button = $(this);
    $('.choice-btn').removeClass('active');
    button.addClass('active');
    state.product = button.data('product');
    state.base = Number(button.data('base'));
    $('#calc-width').val(button.data('width'));
    $('#calc-height').val(button.data('height'));
    updatePressed('.choice-btn');
    calculate();
  });

  $('.finish-btn').on('click', function () {
    const button = $(this);
    $('.finish-btn').removeClass('active');
    button.addClass('active');
    state.finish = button.text().trim();
    state.multiplier = Number(button.data('multiplier'));
    updatePressed('.finish-btn');
    calculate();
  });

  $('.weight-btn').on('click', function () {
    const button = $(this);
    $('.weight-btn').removeClass('active');
    button.addClass('active');
    state.weight = button.text().trim();
    state.cost = Number(button.data('cost'));
    updatePressed('.weight-btn');
    calculate();
  });

  $('.qty-btn').on('click', function () {
    const button = $(this);
    $('.qty-btn').removeClass('active');
    button.addClass('active');
    state.qty = Number(button.data('qty'));
    updatePressed('.qty-btn');
    calculate();
  });

  $('#calc-width, #calc-height, .addon-check input').on('input change', calculate);

  $('#contact-form').on('submit', function (event) {
    event.preventDefault();
    if (this.checkValidity()) {
      $('#form-success').removeClass('d-none').attr('role', 'status');
      this.reset();
    }
    this.classList.add('was-validated');
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

  updatePressed('.choice-btn, .finish-btn, .weight-btn, .qty-btn, .portfolio-filters button');
  calculate();
});