using Hooshabi.WebApi.Shared.Notifications;

namespace Hooshabi.Client.Client.Infrastructure.Notifications;

public record ConnectionStateChanged(ConnectionState State, string? Message) : INotificationMessage;