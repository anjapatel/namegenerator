//would be nice to hide results on load and have a 'play' button or something of that sort
//would like to randomize paragraph text, but everything breaks when i try to do so

//arrays here
var firstword = [
  "Tatiana",
  "Belinda",
  "Helcate",
  "Maeve",
  "Terra",
  "Maribel",
  "Alabaster",
  "Sapphire",
  "Mauve",
];

var secondword = [
  "of the East",
  "of the West",
  "of the Willows",
  "of Windshore",
  "the Good",
  "of Watershore",
  "of Alatar",
  "the Death Witch",
  "of Nightwind",
  "of Elderwind",
  "of Eveningsbane",
  "the Jade Witch",
  "of Deepwood"
];


//randomize! woo!
$('button').click(function() {
  $('h2').text(randomEl(firstword) + ' ' + randomEl(secondword));
  selectElementContents($('h2')[0]);
});

//show element works here, but i can't keep it from firing as soon as i reload
$('button').click(function() {
  $('#text').show(400);
});

//ngl i found this in a fiddle, i don't quite understand the parameters
function randomEl(list) {
  var i = Math.floor(Math.random() * list.length);
  return list[i];
}

function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

$('button').click();
