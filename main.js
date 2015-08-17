// % browserify source/main.js --transform react-jade > build/bundle.js

var React = require('react');
var jade = require('react-jade');
var _ = require('lodash')

var innerTemplate = jade.compileFile(__dirname + '/innerTemplate.jade');
var template = jade.compileFile(__dirname + '/template.jade');

var InnerComponent = React.createClass({
  render: function() {
    return innerTemplate(_.assign({}, this, this.state, this.props));
  }
});

var Counter = React.createClass({
  components: {
        InnerComponent: InnerComponent
    },
  getInitialState: function() {
    return {
      count: 0
    };
  },
  tick: function() {
    this.setState({
      count: this.state.count + 1
    });
  },
  render: function() {
    return template(_.assign({}, this, this.state, this.props));
  }
});

React.render(React.createFactory(Counter)(), document.getElementById('example'));
