var ContentItemPage = React.createClass({
    getInitialState: function() {
        return {
            contentTitle: '',
            contentURL: '',
            contentType: '',
        }
    },

    handleLinkClick: function() {
        window.open(this.props.url)
    },

    render: function() {
        return (
            <div>
                {this.props.contentTitle onClick={this.handleLinkClick}}
            </div>
        );
    }

});