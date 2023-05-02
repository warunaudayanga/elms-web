// noinspection JSUnusedGlobalSymbols

export interface ZoomTokenResponse {
    access_token: string;
    token_type: "bearer";
    refresh_token: string;
    expires_in: number;
    scope: string;
}

export interface ZoomUser {
    personal_meeting_url: string;
    account_number: number;
    cluster: string;
    im_group_ids: any[];
    last_login_time: string;
    jid: string;
    timezone: string;
    created_at: string;
    language: string;
    type: number;
    pmi: number;
    role_id: string;
    group_ids: any[];
    last_client_version: string;
    phone_country: string;
    id: string;
    first_name: string;
    job_title: string;
    email: string;
    use_pmi: boolean;
    user_created_at: string;
    cms_user_id: string;
    verified: number;
    last_name: string;
    dept: string;
    display_name: string;
    role_name: string;
    account_id: string;
    phone_number: string;
    location: string;
    pic_url: string;
    status: string;
    login_types: number[];
}

export interface ZoomCreateMeetingResponse {
    settings: {
        encryption_type: string;
        breakout_room: { enable: boolean };
        show_share_button: boolean;
        registrants_confirmation_email: boolean;
        focus_mode: boolean;
        approved_or_denied_countries_or_regions: { enable: boolean };
        allow_multiple_devices: boolean;
        meeting_authentication: boolean;
        enable_dedicated_group_chat: boolean;
        waiting_room: boolean;
        alternative_hosts: string;
        alternative_host_update_polls: boolean;
        device_testing: boolean;
        participant_video: boolean;
        audio: string;
        show_join_info: boolean;
        in_meeting: boolean;
        mute_upon_entry: boolean;
        enforce_login_domains: string;
        request_permission_to_unmute_participants: boolean;
        join_before_host: boolean;
        host_save_video_order: boolean;
        cn_meeting: boolean;
        watermark: boolean;
        registrants_email_notification: boolean;
        use_pmi: boolean;
        approval_type: number;
        alternative_hosts_email_notification: boolean;
        close_registration: boolean;
        host_video: boolean;
        auto_recording: string;
        enforce_login: boolean;
        jbh_time: number;
        private_meeting: boolean;
        email_notification: boolean;
    };
    join_url: string;
    pstn_password: string;
    timezone: string;
    pre_schedule: boolean;
    start_url: string;
    created_at: string;
    type: number;
    uuid: string;
    host_id: string;
    duration: number;
    start_time: string;
    password: string;
    h323_password: string;
    topic: string;
    id: number;
    host_email: string;
    status: string;
    encrypted_password: string;
}

export interface ZoomMeeting {
    id: number;
    uuid: string;
    type: number;
    duration: number;
    host_id: string;
    join_url: string;
    start_time: string;
    timezone: string;
    topic: string;
    created_at: string;
}

export interface PaginatedZoomResponse<T> {
    page_size: 30;
    total_records: 2;
    next_page_token: "";
    meetings: T[];
}

export interface ZakTokenResponse {
    token: string;
}

export interface StartZoomMeetingOptions {
    leaveUrl: string;
    signature: string;
    meetingId: number;
    joinUrl: string;
    username: string;
    zak?: string;
}
