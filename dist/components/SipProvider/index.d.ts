import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as JsSIP from 'jssip';
import { UnRegisterOptions } from 'jssip/lib/UA';
import { SipExtraHeaders } from '../../siplib/sipua';
import { DtmfOptions, SipCall, SipCallConfig } from "../../siplib/sipcall";
import { LineStatus, SipStatus, SipErrorType } from '../../lib/enums';
import { CallInfo } from '../../lib/types';
export interface JsSipConfig {
    socket: string;
    user: string;
    uri: string;
    password: string;
    realm: string;
    host: string;
    port: number;
    pathname: string;
    secure: boolean;
    autoRegister: boolean;
    autoAnswer: boolean;
    iceRestart: boolean;
    sessionTimersExpires: number;
    extraHeaders: SipExtraHeaders;
    iceServers: RTCIceServer[];
    maxAllowedCalls: number;
    debug: boolean;
    debugNamespaces?: string | null;
    registrar?: string;
}
export interface JsSipState {
    lineStatus: LineStatus;
    sipStatus: SipStatus;
    errorType: SipErrorType;
    errorMessage: string;
    callList: SipCall[];
    callHistory: CallInfo[];
}
export default class SipProvider extends React.Component<JsSipConfig, JsSipState> {
    static childContextTypes: {
        sip: PropTypes.Requireable<PropTypes.InferProps<{
            status: PropTypes.Requireable<string>;
            errorType: PropTypes.Requireable<string>;
            errorMessage: PropTypes.Requireable<string>;
            addr: PropTypes.Requireable<string>;
            host: PropTypes.Requireable<string>;
            port: PropTypes.Requireable<number>;
            user: PropTypes.Requireable<string>;
            pathname: PropTypes.Requireable<string>;
            secure: PropTypes.Requireable<boolean>;
            password: PropTypes.Requireable<string>;
            autoRegister: PropTypes.Requireable<boolean>;
            autoAnswer: PropTypes.Requireable<boolean>;
            sessionTimersExpires: PropTypes.Requireable<number>;
            extraHeaders: PropTypes.Requireable<{
                [x: string]: (string | null | undefined)[] | null | undefined;
            }>;
            iceServers: PropTypes.Requireable<(object | null | undefined)[]>;
            debug: PropTypes.Requireable<boolean>;
            debugNamespaces: PropTypes.Requireable<string>;
        }>>;
        calls: PropTypes.Requireable<(PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            _direction: PropTypes.Requireable<string>;
            _remoteUri: PropTypes.Requireable<string>;
            _status: PropTypes.Requireable<string>;
            _isActive: PropTypes.Requireable<boolean>;
            _mediaSessionStatus: PropTypes.Requireable<string>;
            _startTime: PropTypes.Requireable<string>;
            _endTime: PropTypes.Requireable<string>;
            _endMode: PropTypes.Requireable<string>;
            _errorReason: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
        callHistory: PropTypes.Requireable<(PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            _direction: PropTypes.Requireable<string>;
            _remoteName: PropTypes.Requireable<string>;
            _remoteUser: PropTypes.Requireable<string>;
            _startTime: PropTypes.Requireable<string>;
            _endTime: PropTypes.Requireable<string>;
            _endMode: PropTypes.Requireable<string>;
            _errorReason: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
        isLineConnected: PropTypes.Requireable<(...args: any[]) => any>;
        isRegistered: PropTypes.Requireable<(...args: any[]) => any>;
        hasError: PropTypes.Requireable<(...args: any[]) => any>;
        getErrorMessage: PropTypes.Requireable<(...args: any[]) => any>;
        registerSip: PropTypes.Requireable<(...args: any[]) => any>;
        unregisterSip: PropTypes.Requireable<(...args: any[]) => any>;
        makeCall: PropTypes.Requireable<(...args: any[]) => any>;
        playTone: PropTypes.Requireable<(...args: any[]) => any>;
        stopTone: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static propTypes: {
        socket: PropTypes.Requireable<string>;
        user: PropTypes.Requireable<string>;
        uri: PropTypes.Requireable<string>;
        password: PropTypes.Requireable<string>;
        realm: PropTypes.Requireable<string>;
        secure: PropTypes.Requireable<boolean>;
        autoRegister: PropTypes.Requireable<boolean>;
        autoAnswer: PropTypes.Requireable<boolean>;
        iceRestart: PropTypes.Requireable<boolean>;
        sessionTimersExpires: PropTypes.Requireable<number>;
        extraHeaders: PropTypes.Requireable<{
            [x: string]: (string | null | undefined)[] | null | undefined;
        }>;
        iceServers: PropTypes.Requireable<(object | null | undefined)[]>;
        maxAllowedCalls: PropTypes.Requireable<number>;
        debug: PropTypes.Requireable<boolean>;
        registrar: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        host: null;
        port: null;
        pathname: string;
        secure: boolean;
        user: null;
        password: null;
        autoRegister: boolean;
        autoAnswer: boolean;
        iceRestart: boolean;
        sessionTimersExpires: number;
        maxAllowedCalls: number;
        extraHeaders: {
            register: never[];
            invite: never[];
            nonInvite: never[];
            info: never[];
            refer: never[];
            resp2xx: never[];
            resp4xx: never[];
        };
        iceServers: never[];
        debug: boolean;
        children: null;
    };
    private ua;
    private eventBus;
    private _logger;
    private _localAddr;
    private _mediaEngine;
    private _uaConfig;
    private _callConfig;
    private _rtcConfig;
    private _dtmfOptions;
    constructor(props: any);
    getChildContext(): {
        sip: {
            addr: string;
            status: SipStatus;
            errorType: SipErrorType;
            errorMessage: string;
            socket: string;
            user: string;
            uri: string;
            password: string;
            realm: string;
            host: string;
            port: number;
            pathname: string;
            secure: boolean;
            autoRegister: boolean;
            autoAnswer: boolean;
            iceRestart: boolean;
            sessionTimersExpires: number;
            extraHeaders: SipExtraHeaders;
            iceServers: RTCIceServer[];
            maxAllowedCalls: number;
            debug: boolean;
            debugNamespaces?: string | null | undefined;
            registrar?: string | undefined;
            children?: React.ReactNode;
        };
        calls: SipCall[];
        callHistory: CallInfo[];
        isLineConnected: any;
        isRegistered: any;
        hasError: any;
        getErrorMessage: any;
        registerSip: any;
        unregisterSip: any;
        makeCall: any;
        playTone: any;
        stopTone: any;
    };
    _initProperties: () => void;
    _getCallConfig: () => SipCallConfig;
    _getRTCConfig: () => RTCConfiguration;
    _getDtmfOptions: () => DtmfOptions;
    _getUA: () => JsSIP.UA | null;
    _getUAOrFail: () => JsSIP.UA;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    getActiveCall: () => SipCall | undefined;
    getLastCall: () => SipCall | undefined;
    isLineConnected: () => boolean;
    isRegistered: () => boolean;
    hasError: () => boolean;
    getErrorMessage: () => string;
    _isCallAllowed: () => boolean;
    _addToHistory: (call: any) => void;
    registerSip(): void;
    unregisterSip(options?: UnRegisterOptions): void;
    makeCall: (callee: string, isVideoCall: boolean) => string;
    playTone: (tone: string) => void;
    stopTone: (tone: string) => void;
    _terminateAll: () => void;
    _reconfigureDebug(): void;
    _reinitializeJsSIP(): Promise<void>;
    render(): React.ReactNode;
}
