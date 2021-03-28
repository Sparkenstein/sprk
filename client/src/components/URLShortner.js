import { useState } from 'react';

function URLShortner() {
    const [showToast, setShowToast] = useState(false);
    const [password, setPassword] = useState('');
    const [expiry, setExpiry] = useState('');
    const [custom, setCustom] = useState('');
    const [sucessMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showExpires, setShowExpires] = useState(false);
    const [showCustom, setShowCustom] = useState(false);
    const [url, setUrl] = useState('');
    const [clipboardTooltipText, setClipboardTooltipText] = useState(
        'Copy to clipboard'
    );

    const handleOnExpiresToggle = e => {
        if (!e.target.checked) {
            setExpiry('');
        }
        setShowExpires(!showExpires);
    };

    const handleOnPasswordToggle = e => {
        if (!e.target.checked) {
            setPassword('');
        }
        setShowPassword(!showPassword);
    };

    const handleOnCustomChanged = e => {
        if (!e.target.checked) {
            setCustom('');
        }
        setShowCustom(!showCustom);
    };

    const handleOnClipboardClick = () => {
        setClipboardTooltipText('Copied');
        setTimeout(() => {
            setClipboardTooltipText('Copy to clipboard');
        }, 2000);
    };

    const handleUrlOnChange = e => {
        setUrl(e.target.value);
    };

    const handleSubmit = async () => {
        if (!url) {
            setShowToast(true);
            setSuccessMessage('Please enter an URL to shorten');
            return;
        }
        const payload = {
            url,
            pass: password,
            expires: expiry,
            custom
        };
        const res = await fetch('/', {
            method: 'POST',
            headers: {
                'x-delta-type': 'file',
                'api-key': 'spark1234',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(data => {
                setShowToast(true);
                setUrl('');
                return data.text();
            })
            .catch(error => {
                console.error(error);
            });
        setSuccessMessage(res);
        console.log(res);
    };

    return (
        <div id="urlshortner">
            <div className="container mt-2">
                <div className="columns">
                    <div className="column col-10 col-mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title h5">
                                    <h3>Shorten URL</h3>
                                </div>
                                {showToast ? (
                                    <div
                                        style={{ marginTop: '10px' }}
                                        className="toast toast-primary"
                                    >
                                        {sucessMessage !==
                                        'Please enter an URL to shorten' ? (
                                            <div
                                                style={{
                                                    display: 'flex'
                                                }}
                                            >
                                                <a
                                                    href={sucessMessage}
                                                    target="_new"
                                                >
                                                    {sucessMessage}{' '}
                                                </a>
                                                <div
                                                    className="tooltip tooltip-right"
                                                    data-tooltip={
                                                        clipboardTooltipText
                                                    }
                                                    onClick={
                                                        handleOnClipboardClick
                                                    }
                                                >
                                                    <i
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(
                                                                sucessMessage
                                                            );
                                                        }}
                                                        className="icon icon-copy "
                                                        style={{
                                                            margin: 'auto 5px'
                                                        }}
                                                    ></i>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>{sucessMessage}</div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="shortenurl"
                                    >
                                        Paste an URL
                                    </label>
                                    <input
                                        onChange={handleUrlOnChange}
                                        value={url}
                                        className="form-input"
                                        type="text"
                                        id="shortenurl"
                                        placeholder="URL"
                                    />
                                </div>
                                {/* OPTIONS */}
                                <div className="columns">
                                    <div className="column col-12">
                                        <ul
                                            className="menu"
                                            style={{ marginTop: '15px' }}
                                        >
                                            {/* <li
                                                className="divider"
                                                data-content="Options"
                                            ></li> */}
                                            <li className="menu-item">
                                                <div className="columns">
                                                    <div className="column">
                                                        <label className="form-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                onChange={
                                                                    handleOnPasswordToggle
                                                                }
                                                            />
                                                            <i className="form-icon"></i>
                                                            password
                                                        </label>
                                                    </div>
                                                    <div className="column">
                                                        <label
                                                            data-tooltip="eg: 2s/5m/3h/4d/1w/12M"
                                                            className="form-checkbox tooltip tooltip-left"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                onChange={
                                                                    handleOnExpiresToggle
                                                                }
                                                            />
                                                            <i className="form-icon"></i>
                                                            expires
                                                        </label>
                                                    </div>
                                                    <div className="column">
                                                        <label className="form-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                onChange={
                                                                    handleOnCustomChanged
                                                                }
                                                            />
                                                            <i className="form-icon"></i>
                                                            Custom url
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="menu-item">
                                                <div className="columns">
                                                    <div className="column ">
                                                        {showPassword ? (
                                                            <input
                                                                type="text"
                                                                className="form-input"
                                                                placeholder="enter password"
                                                                onChange={e => {
                                                                    setPassword(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                                value={password}
                                                            ></input>
                                                        ) : null}
                                                    </div>

                                                    <div className="column">
                                                        {showExpires ? (
                                                            <input
                                                                type="text"
                                                                className="form-input"
                                                                placeholder="enter expiry"
                                                                onChange={e => {
                                                                    setExpiry(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                                value={expiry}
                                                            ></input>
                                                        ) : null}
                                                    </div>
                                                    <div className="column">
                                                        {showCustom ? (
                                                            <input
                                                                type="text"
                                                                className="form-input"
                                                                placeholder="enter expiry"
                                                                onChange={e => {
                                                                    setCustom(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                                value={custom}
                                                            ></input>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <button
                                    style={{ marginTop: '15px' }}
                                    className="btn btn-success"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default URLShortner;
