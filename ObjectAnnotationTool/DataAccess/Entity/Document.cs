﻿namespace ObjectAnnotationTool.DataAccess.Entity
{
    public class Document:IEntity
    {

        public int Id { get; set; }

        public string? Name { get; set; }     

        public string? Path { get; set; }

        public string ImageBase64 { get; set; }

        public string Keyword { get; set; }







    }
}
