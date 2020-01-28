module.exports = {
  theme: {
    extend: {
      spacing: {
        '72': '18rem', // 64/4
        '1/4': '25%',
        '1/3': '33.333333%',
        '1/2': '50%',
        '2/3': '66.666667%',
        '3/4': '75%',
      },
    },
    customForms: theme => ({
      dark: {
        'input, textarea, multiselect, checkbox, radio': {
          backgroundColor: theme('colors.gray.900'),
          color: '#fff',
        },
        select: {
          backgroundColor: theme('colors.gray.600'),
        },
      },
      sm: {
        'input, textarea, multiselect, select': {
          fontSize: theme('fontSize.sm'),
          padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
        },
        select: {
          paddingRight: `${theme('spacing.4')}`,
        },
        'checkbox, radio': {
          width: theme('spacing.3'),
          height: theme('spacing.3'),
        },
      },
    }),
  },

  plugins: [
    require('@tailwindcss/custom-forms'),
    function({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls(decl => {
            decl.important = true;
          });
        });
      });
    },
    function({ addUtilities }) {
      const newUtils = {
        '.grow-sm': {
          transform: 'scale(1.15)',
          transition: 'transform 0.3s ease-in-out',
        },
      };

      addUtilities(newUtils, {
        variants: ['responsive', 'hover'],
      });
    },
  ],
  variants: {
    alignContent: ['responsive', 'important'],
    alignItems: ['responsive', 'important'],
    alignSelf: ['responsive', 'important'],
    appearance: ['responsive', 'important'],
    backgroundAttachment: ['responsive', 'important'],
    backgroundColor: ['responsive', 'important', 'hover', 'focus'],
    backgroundPosition: ['responsive', 'important'],
    backgroundRepeat: ['responsive', 'important'],
    backgroundSize: ['responsive', 'important'],
    borderCollapse: ['responsive', 'important'],
    borderColor: ['responsive', 'important', 'hover', 'focus'],
    borderRadius: ['responsive', 'important'],
    borderStyle: ['responsive', 'important'],
    borderWidth: ['responsive', 'important'],
    boxShadow: ['responsive', 'important', 'hover', 'focus'],
    cursor: ['responsive', 'important'],
    display: ['responsive', 'important'],
    fill: ['responsive', 'important'],
    flex: ['responsive', 'important'],
    flexDirection: ['responsive', 'important'],
    flexGrow: ['responsive', 'important'],
    flexShrink: ['responsive', 'important'],
    flexWrap: ['responsive', 'important'],
    float: ['responsive', 'important'],
    fontFamily: ['responsive', 'important'],
    fontSize: ['responsive', 'important'],
    fontSmoothing: ['responsive', 'important'],
    fontStyle: ['responsive', 'important'],
    fontWeight: ['responsive', 'important', 'hover', 'focus'],
    height: ['responsive', 'important'],
    inset: ['responsive', 'important'],
    justifyContent: ['responsive', 'important'],
    letterSpacing: ['responsive', 'important'],
    lineHeight: ['responsive', 'important'],
    listStylePosition: ['responsive', 'important'],
    listStyleType: ['responsive', 'important'],
    margin: ['responsive', 'important'],
    maxHeight: ['responsive', 'important'],
    maxWidth: ['responsive', 'important'],
    minHeight: ['responsive', 'important'],
    minWidth: ['responsive', 'important'],
    objectFit: ['responsive', 'important'],
    objectPosition: ['responsive', 'important'],
    opacity: ['responsive', 'important', 'hover', 'focus'],
    order: ['responsive', 'important'],
    outline: ['responsive', 'important', 'focus'],
    overflow: ['responsive', 'important'],
    padding: ['responsive', 'important'],
    pointerEvents: ['responsive', 'important'],
    position: ['responsive', 'important'],
    resize: ['responsive', 'important'],
    stroke: ['responsive', 'important'],
    tableLayout: ['responsive', 'important'],
    textAlign: ['responsive', 'important'],
    textColor: ['responsive', 'important', 'hover', 'focus'],
    textDecoration: ['responsive', 'important', 'hover', 'focus'],
    textTransform: ['responsive', 'important'],
    userSelect: ['responsive', 'important'],
    verticalAlign: ['responsive', 'important'],
    visibility: ['responsive', 'important'],
    whitespace: ['responsive', 'important'],
    width: ['responsive', 'important'],
    wordBreak: ['responsive', 'important'],
    zIndex: ['responsive', 'important'],
  },
};
