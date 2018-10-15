add(h1('My Test Page'))
add(label('Welcome to my cool test page!'))
add(line())
add([checkbox(true), label('Do cool stuff.')])
add(line())
add(button("Click","ALARM"))
add(line())

listen("ALARM", function() {
  console.log('Alarm event detected!')
  add([checkbox(false), label('Do more cool stuff.'), line()])
})