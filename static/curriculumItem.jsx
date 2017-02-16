var CurriculumList = React.createClass({
    render: function() {
        return (
            <div>
                <CurriculumItem 
                    curricItems={this.props.curricItems} />
            </div>
        );
    }
});

var CurriculumItem = React.createClass({

    render: function(){
        console.log('curriculumitem is working')
        var curricItems = this.props.curricItems.map(function(curricItem, index){
            return (<li key={index}>{curricItem}</li>);
        });

        return (
            <div>
                {curricItems}
            </div>
        );
    }
});