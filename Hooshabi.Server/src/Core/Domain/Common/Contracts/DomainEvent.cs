using Hooshabi.Server.Shared.Events;

namespace Hooshabi.Server.Domain.Common.Contracts;

public abstract class DomainEvent : IEvent
{
    public DateTime TriggeredOn { get; protected set; } = DateTime.UtcNow;
}