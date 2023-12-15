import {Component} from "react";
import PropTypes from 'prop-types';

class Input extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string,
        error: PropTypes.string,
        type: PropTypes.string.isRequired
    }

    render() {
        const {name, label, error, onChange, value, type} = this.props;
        return (
            <div className="form-group">
                <label className="col-sm-2 control-label" htmlFor={name}>{label}</label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        type={type}
                    />
                   {error && <div className="alert-danger">{error}</div>}
                </div>

            </div>
        );
    }
}

export default Input;