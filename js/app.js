$(function() {
    document.addEventListener('init', function(event) {
        var page = event.target;

        console.log(page.id);
        if (page.id === 'Home') {
            $('#back').hide();
            page.querySelector('#johnwick').onclick = function() {
                document.querySelector('#myNavigator').pushPage('views/detail.html');

            };
            page.querySelector('#wonderwoman').onclick = function() {
                document.querySelector('#myNavigator').pushPage('views/detail2.html');
            };
            page.querySelector('#toystory').onclick = function() {
                document.querySelector('#myNavigator').pushPage('views/cart.html');
            };
        } else if (page.id === 'johnwick' || page.id === 'wonderwoman' || page.id === 'toystory') {
            $('#back').show();
            document.querySelector('ons-back-button').onclick = function(event) {
                document.querySelector('#myNavigator').popPage();
            };
        } 
    });
    
})

function openproductDetails(id) {
    document.querySelector('#myNavigator').pushPage('product_details.html', {data: {title: id}});
  }

  function goBack() {
    document.querySelector('#menu').close().then(function() {
      document.querySelector('#myNavigator').popPage()
    });
  }


  window.fn = {};

  window.fn.open = function() {
    var menu = document.getElementById('menu');
    menu.open();
  };
  
  window.fn.load = function(page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content.load(page)
      .then(menu.close.bind(menu));
  };

 