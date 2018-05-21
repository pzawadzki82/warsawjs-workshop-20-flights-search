import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';


export class PrimaryButton extends Component {
    render() {
        const {text, onClick, disabled} = this.props; //destructing
        return (
            <Button variant="raised" color="primary"  onClick={onClick} disabled={disabled}>
                {text}
            </Button>
        )
    }
}

PrimaryButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

PrimaryButton.defaultProps = {
    disabled: false
};