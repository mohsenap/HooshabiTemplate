using System.ComponentModel.DataAnnotations.Schema;

namespace Hooshabi.Server.Domain.Catalog;

public class Entity1 : AuditableEntity<int>, IAggregateRoot
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public override int Id { get => base.Id; set => base.Id=value; }
    public string Name { get; private set; }
    public string? Description { get; private set; }
   
}