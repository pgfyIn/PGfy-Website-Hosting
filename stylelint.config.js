export default {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],

  rules: {
    'order/properties-order': null,

    'no-descending-specificity': null,

    'color-function-notation': null,

    'color-function-alias-notation': null,

    'alpha-value-notation': null,

    'declaration-block-no-redundant-longhand-properties': null,

    'selector-class-pattern': null,

    'keyframes-name-pattern': null,

    'rule-empty-line-before': [
      'always',

      {
        except: ['first-nested'],
      },
    ],
  },
};
