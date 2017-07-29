# CSS with Direction-free
Using css with logical properties ^_~

# Example
Configuring it
`MyCSS.direction = 'rtl'; // rtl, ltr`

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

# License
[CC-BY-SA](http://creativecommons.org/licenses/by-sa/4.0/)
