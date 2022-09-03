using Hooshabi.Server.Shared.Events;

namespace Hooshabi.Server.Application.Common.Events;

public interface IEventPublisher : ITransientService
{
    Task PublishAsync(IEvent @event);
}