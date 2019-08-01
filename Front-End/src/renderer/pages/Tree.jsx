import React from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: props.data,
        };
        this.getRootNodes = this.getRootNodes.bind(this);
        this.getChildNodes = this.getChildNodes.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onNodeSelect =this.onNodeSelect.bind(this);
        this.onChecked = this.onChecked.bind(this);
    }

    getRootNodes(){
        const {nodes} = this.state;
        return values(nodes).filter(node => node.isRoot === true);
    };
    getChildNodes(node){
        const {nodes} = this.state;
        if (!node.children) return [];
        return node.children.map(path => nodes[path]);
    };

    onToggle(node){
        const {nodes} = this.state;
        const {onToggle} = this.props;
        nodes[node.path].isOpen = !node.isOpen;
        this.setState({nodes});
        onToggle(node);
    };

    onNodeSelect(node){
        const {onSelect} = this.props;
        onSelect(node);
    };

    onChecked(node){
        const {nodes} = this.state;
        const {onChecked} = this.props;
        nodes[node.path].checked = !node.checked;
        this.setState({nodes});
        onChecked(node);
    };

    render() {
        const rootNodes = this.getRootNodes();
        return (
            <div>
                {rootNodes.map(node => (
                    <TreeNode
                        node={node}
                        getChildNodes={this.getChildNodes}
                        onToggle={this.onToggle}
                        onNodeSelect={this.onNodeSelect}
                        onChecked={this.onChecked}
                    />
                ))}
            </div>
        )
    }
}

Tree.propTypes = {
    onSelect: PropTypes.func.isRequired,
};