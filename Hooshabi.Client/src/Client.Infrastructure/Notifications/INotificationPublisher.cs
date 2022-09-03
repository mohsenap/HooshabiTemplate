using FSH.WebApi.Shared.Notifications;

namespace Hooshabi.Client.Client.Infrastructure.Notifications;

public interface INotificationPublisher
{
    Task PublishAsync(INotificationMessage notification);
}