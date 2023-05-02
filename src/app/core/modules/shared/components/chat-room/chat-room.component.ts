import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ChatRoom, Message, MessageStatus, MessageType, Role } from "../../../../entity";
import { AppService } from "../../../../../app.service";
import { getRandomColor } from "../../../../utils/utils";
import { NgInputComponent } from "../../../ng-control/components/ng-input/ng-input.component";
import { AppEvent } from "../../../../enums/app-event.enum";
import { SocketService } from "../../../../services/socket.service";
import { CreateMessageDto } from "../../../../../system/shared/dtos/create-message.dto";
import { Subscription } from "rxjs";
import { GetMessageDto } from "../../../../../system/shared/dtos/get-message.dto";

@Component({
    selector: "app-chat-room",
    templateUrl: "./chat-room.component.html",
    styleUrls: ["./chat-room.component.scss"],
})
export class ChatRoomComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() chatRoom!: ChatRoom;

    @Input() name!: string;

    @Input() fullScreen: boolean = false;

    @ViewChild("chat") chatRef!: ElementRef<HTMLDivElement>;

    messages?: Message[];

    colors?: Map<number, string>;

    opened: boolean = false;

    unreadCount: number = 0;

    messageSub?: Subscription;

    constructor(public readonly app: AppService, private readonly socketService: SocketService) {
        this.messageSub = this.socketService.onMessage<Message>(AppEvent.MESSAGE_CREATED)?.subscribe(message => {
            if (message.chatRoom?.id === this.chatRoom.id) {
                if (!this.colors?.has(message.senderId)) {
                    this.colors?.set(message.senderId, getRandomColor());
                }
                this.messages!.push(message);
                this.scrollToBottom();
                if (this.opened) {
                    this.setRead();
                } else {
                    this.unreadCount++;
                }
            }
        });
    }

    async ngOnInit(): Promise<void> {
        await this.getMessages();
    }

    async getMessages(): Promise<void> {
        this.messages = await this.socketService.sendMessageAsync<GetMessageDto, Message[]>(AppEvent.MESSAGE_GET, {
            chatRoomId: this.chatRoom.id,
        });
        const userIds = Array.from(new Set(this.messages?.map(message => message.senderId)));
        this.colors = new Map<number, string>(userIds.map(userId => [userId, getRandomColor()]));
        this.setDelivered();
        this.scrollToBottom();
    }

    ngAfterViewInit(): void {
        this.scrollToBottom();
    }

    openChat(): void {
        this.opened = true;
        this.setRead();
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        setTimeout(() => {
            const chat = this.chatRef?.nativeElement;
            chat?.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
        });
    }

    setDelivered(): void {
        this.socketService.sendMessage(AppEvent.MESSAGE_DELIVERED, { chatRoomId: this.chatRoom.id });
        this.unreadCount =
            this.messages?.filter(message => {
                const msu = message.messageUserStatus?.find(mus => mus.readerId === this.app.user?.id);
                if (msu) {
                    if (msu.status === MessageStatus.SENT) msu.status = MessageStatus.DELIVERED;
                    return msu.status === MessageStatus.DELIVERED;
                }
                return false;
            }).length ?? 0;
    }

    setRead(): void {
        this.socketService.sendMessage(AppEvent.MESSAGE_SEEN, { chatRoomId: this.chatRoom.id });
        this.messages?.forEach(message => {
            const msu = message.messageUserStatus?.find(mus => mus.readerId === this.app.user?.id);
            if (msu) {
                if (msu.status === MessageStatus.DELIVERED) msu.status = MessageStatus.SEEN;
            }
            return false;
        });
        this.unreadCount = 0;
    }

    async sendMessage(messageControl: NgInputComponent): Promise<void> {
        if (messageControl.value !== "") {
            let type: MessageType;
            switch (this.app.user?.role) {
                case Role.TUTOR:
                    type = MessageType.TUTOR;
                    break;
                case Role.ADMIN:
                    type = MessageType.ADMIN;
                    break;
                case Role.SUPER_ADMIN:
                    type = MessageType.ADMIN;
                    break;
                default:
                    type = MessageType.NORMAL;
            }
            const dto: CreateMessageDto = {
                chatRoomId: this.chatRoom!.id,
                type,
                message: messageControl.value as string,
            };
            messageControl.value = "";
            messageControl.autoResizeTextArea();
            const message = await this.socketService.sendMessageAsync(AppEvent.MESSAGE_CREATE, dto);
            this.messages!.push(message);
            this.scrollToBottom();
        }
    }

    ngOnDestroy(): void {
        this.messageSub?.unsubscribe();
    }

    protected readonly Role = Role;
}
