var gmail;

function refresh(f) {
  if(/in/.test(document.readyState)) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

var main = function(){
  gmail = new Gmail();
  console.log('Hello,', gmail.get.user_email());
  gmail.observe.before("send_message", function(url, body, data, xhr) {
    var body_params = xhr.xhrParams.body_params;
    var toList = [];

    //toList is the basis for the markup at the beginning of the email
    for (var i in xhr.xhrParams.body_params.to) {
      toList.push(xhr.xhrParams.body_params.to[i]);
    }
    for (i in xhr.xhrParams.body_params.cc) {
      toList.push(xhr.xhrParams.body_params.cc[i]);
    }
    var toString = '#to ';
    for (i in toList) {
      toString += (toList[i] + ' ');
    }
    toString += '#';
    console.log(toList);
    console.log(toString);
    xhr.xhrParams.body_params.body = toString + xhr.xhrParams.body_params.body;
    xhr.xhrParams.body_params.cc = ['send@flybox.io'];
    console.log(body_params);
  });
};

refresh(main);
