Mallory Milstead
6/26/2018
WEB-151
M4T2-JavaScript Turtle

//My initials

clear();
JS> lt(90)
JS> penup();
JS> fd(200)
JS> lt(90)
JS> rt(180)
JS> pendown();
JS> fd(150)
JS> rt(160)
JS> fd(60)
JS> lt(160)
JS> rt(20)
JS> fd(60)
JS> rt(140)
JS> rt(40)
JS> lt(40)
JS> rt(20)
JS> fd(150)
JS> penup();
JS> lt(90)
JS> fd(50)
JS> lt(90)
JS> fd(150)
JS> rt(180)
JS> fd(150)
JS> lt(180)
JS> pendown();
JS> fd(150)
JS> rt(160)
JS> fd(60)
JS> lt(140)
JS> fd(60)
JS> rt(160)
JS> fd(150)
JS> penup();
JS> lt(90)
JS> fd(100)


//Snowflake

 JS> clear();
JS>  var createSide = function(){lt(120); penup(); fd(60); lt(120); pendown(); fd(120); penup(); lt(120); penup(); fd(60); 
... lt(120); pendown(); fd(120); lt(180); fd(60);} 
... 
JS> var createOuter = function(){fd(240); createSide(); rt(120); fd(180); rt(30);} 
... 
JS> createSide();
JS> createSide();
JS> createSide();
JS> createSide();
JS> createSide();
JS> createSide();
JS> lt(120);
JS> fd(60);
JS> createOuter();
JS> createOuter();
JS> createOuter();
JS> createOuter();
JS> createOuter();
JS> createOuter();
JS> createOuter();
JS> createOuter();
JS> createOuter();
JS> createOuter();
JS> createOuter();
JS> createOuter();
JS> 