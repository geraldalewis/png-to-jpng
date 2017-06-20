import JpngResult from './JpngResult.vue';
import JpngError from './JpngError.vue';

export default {
  name: 'jpng-result-or-error',
  functional: true,
  components: { 'jpng-result': JpngResult, 'jpng-error': JpngError },
  props: ['record'],
  render: function(createElement, context){
    return context.props.record.error 
      ? createElement(JpngError, { props: context.props })
      : createElement(JpngResult, { props: context.props });
  }
};