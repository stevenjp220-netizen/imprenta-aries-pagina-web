$(function () {
  const state = { product: 'Tarjetas personales', base: 45, finish: 'CouchÃƒÆ’Ã‚Â© mate', multiplier: 1, weight: '300g', cost: 1.35, qty: 100 };
  const format = new Intl.NumberFormat('es-BO');

  function calculate() {
    const width = Number($('#calc-width').val()) || 9;
    const height = Number($('#calc-height').val()) || 5;
    const areaRatio = Math.max(0.6, Math.min(6, (width * height) / 45));
    const scales = { 100: 1, 250: 1.7, 500: 2.8, 1000: 4.5, 2500: 9.2 };
    let total = state.base * (areaRatio * .4 + .6) * state.multiplier * state.cost * (scales[state.qty] || 1);
    $('.addon-check input:checked').each(function () { total += Number($(this).data('addon')) * (state.qty / 1000 + .8); });
    total = Math.round(total);
    $('#total-price').text(format.format(total));
    $('#unit-price').text(`Bs. ${(total / state.qty).toFixed(2)} / unidad`);
    $('#summary-product').text(state.product);
    $('#summary-paper').text(`${state.finish} Ãƒâ€šÃ‚Â· ${state.weight}`);
    $('#summary-size').text(`${width} ÃƒÆ’Ã¢â‚¬â€ ${height} cm`);
    $('#summary-qty').text(`${format.format(state.qty)} unidades`);
    const message = `Hola Aries Imprenta, deseo cotizar ${state.product}, ${state.finish} ${state.weight}, medida ${width} ÃƒÆ’Ã¢â‚¬â€ ${height} cm, ${state.qty} unidades. Estimado: Bs. ${total}.`;
    $('#whatsapp-quote').attr('href', `https://wa.me/59170000001?text=${encodeURIComponent(message)}`);
  }

  $('.choice-btn').on('click', function () { const b = $(this); $('.choice-btn').removeClass('active'); b.addClass('active'); state.product = b.data('product'); state.base = Number(b.data('base')); $('#calc-width').val(b.data('width')); $('#calc-height').val(b.data('height')); calculate(); });
  $('.finish-btn').on('click', function () { const b = $(this); $('.finish-btn').removeClass('active'); b.addClass('active'); state.finish = b.text(); state.multiplier = Number(b.data('multiplier')); calculate(); });
  $('.weight-btn').on('click', function () { const b = $(this); $('.weight-btn').removeClass('active'); b.addClass('active'); state.weight = b.text(); state.cost = Number(b.data('cost')); calculate(); });
  $('.qty-btn').on('click', function () { const b = $(this); $('.qty-btn').removeClass('active'); b.addClass('active'); state.qty = Number(b.data('qty')); calculate(); });
  $('#calc-width, #calc-height, .addon-check input').on('input change', calculate);
  $('#contact-form').on('submit', function (event) { event.preventDefault(); if (this.checkValidity()) { $('#form-success').removeClass('d-none'); this.reset(); } });
  $('.portfolio-filters button').on('click', function () { const filter = $(this).data('filter'); $('.portfolio-filters button').removeClass('active'); $(this).addClass('active'); $('.work-item').each(function () { $(this).toggle(filter === 'all' || $(this).data('category') === filter); }); });
  $('.navbar-nav .nav-link').on('click', function () { $('.navbar-nav .nav-link').removeClass('active'); $(this).addClass('active'); const menu = document.querySelector('.navbar-collapse'); if (menu && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide(); });
  calculate();
});
