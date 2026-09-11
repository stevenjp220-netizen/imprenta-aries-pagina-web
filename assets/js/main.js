$(function () {
  function updatePressed(selector) {
    $(selector).each(function () {
      $(this).attr('aria-pressed', $(this).hasClass('active') ? 'true' : 'false');
    });
  }

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

  updatePressed('.portfolio-filters button');
});