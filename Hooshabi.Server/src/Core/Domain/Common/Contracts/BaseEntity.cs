using System.ComponentModel.DataAnnotations.Schema;
using MassTransit;

namespace Hooshabi.Server.Domain.Common.Contracts;

public abstract class BaseEntity : BaseEntity<DefaultIdType>
{
    protected BaseEntity() => Id = NewId.Next().ToGuid();
}

public abstract class BaseEntity<TId> : IEntity<TId>
{
    public virtual TId Id { get; set; } 

    [NotMapped]
    public List<DomainEvent> DomainEvents { get; } = new();
}