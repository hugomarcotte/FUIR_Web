Parse.initialize('DJnfc0KsF8WRF0K2lr25mVm95Uzg0xnUAG72axAX', 'NTxalrgpCfGdeMwIVQ8r2budaoApAWpITreGfH10');

window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({
    appId      : '398051100360566',
    status     : false,
    version:  'v2.0',
    cookie     : true,
    xfbml      : true
  });

  // Run code after the Facebook SDK is loaded.
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/all.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
