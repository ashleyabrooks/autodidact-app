var ListComponent = React.createClass({

    getInitialState: function() {
        return {content: this.props.content}
    },

    dragStart: function(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
    },

    dragEnd: function(e) {

        this.dragged.parentNode.removeChild(placeholder);

        // Update state
        var content = this.state.content;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        
        if(from < to) to--;
        content.splice(to, 0, content.splice(from, 1)[0]);
        this.setState({content: content});
    },

    dragOver: function(e) {
        e.preventDefault();
        if(e.target.className == "placeholder") return;
        this.over = e.target;
        e.target.parentNode.insertBefore(placeholder, e.target);
    },

    render: function () {
        if (this.props.content)
            return (
                <div>
                    <ul onDragOver={this.dragOver}>
                        <li
                            data-id={i}
                            draggable='true'
                            onDragEnd={this.dragEnd}
                            onDragStart={this.dragStart}
                        >
                            <ContentItem />
                        </li>
                    </ul>    
                </div>
            );
    }
});