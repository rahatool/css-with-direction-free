# CSS with Direction-free
Using css with logical properties ^_~

# How to use
Configuring it
```javascript
MyCSS.direction = 'rtl'; // rtl OR ltr
```

in:
```javascript
MyCSS.rules = {
	'body > p': {
		'font-size': {
			ltr: '1rem',
			rtl: '5rem',
		},
		'margin-start': '10rem',
	},
	'.floated-item': {
		'float': 'start',
		'text-shadow': '1px 1px #ddd',
	}
};
```

if direction is rtl then out equal to:
```css
body > p {
	font-size: 5rem;
	margin-right: 10rem;
}
.floated-item {
	float: right;
	text-shadow: -1px 1px #ddd;
}
```

if direction is ltr then out equal to:
```css
body > p {
	font-size: 1rem;
	margin-left: 10rem;
}
.floated-item {
	float: left;
	text-shadow: 1px 1px #ddd;
}
```
# Installation
```html
<script src="my-css.js"></script>
<script>
	MyCSS.rules = {
		// here
	};
</script>
```

# Browser support
Direction-free has been tested and works on the following browsers:
- Chrome (desktop & Android)
- Firefox
- Opera
- Safari (desktop & iOS)
- IE8+
-Android WebKit

# License
Direction-free is licensed under the [CC-BY-SA](http://creativecommons.org/licenses/by-sa/4.0/) License. Copyright 2017 Mahdi NezaratiZadeh. All rights reserved.
