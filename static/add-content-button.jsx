'use strict';

var AddContentButton = React.createClass({
    
    addNewTopic: function() {
        $.post('/add-topic', data, function() {
            // SUCCESS FUNCTION
            console.log('Added new topic')
        })
    },

    render: function() {
        return (
            
            <ReactRouter.Link to='/add-topic'>
                <button type='button' onClick={ this.addNewTopic }>{this.props.cta}</button>
            </ReactRouter.Link>
        );
    },
});