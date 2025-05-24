using DTO;
using MigraDoc.DocumentObjectModel;
using MigraDoc.DocumentObjectModel.Shapes;
using MigraDoc.DocumentObjectModel.Tables;
using MigraDoc.Rendering;
using PdfSharp;
using PdfSharp.Pdf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml.XPath;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace ngLMS.Controllers
{
    public class LM_PdfGenerator
    {

        static Document document;
        static TextFrame addressFrame;
        static Table table;

        public PdfDocument GeneratePDF(Lead leadDtl, List<LeadMsg> msg)
        {
            //// Create a MigraDoc document
            //Document document1 = CreateDocument(leadDtl, msg);
            //document1.UseCmykColor = true;

            //// ===== Unicode encoding and font program embedding in MigraDoc is demonstrated here =====

            //// A flag indicating whether to create a Unicode PDF or a WinAnsi PDF file.
            //// This setting applies to all fonts used in the PDF document.
            //// This setting has no effect on the RTF renderer.
            //const bool unicode = false;

            //// An enum indicating whether to embed fonts or not.
            //// This setting applies to all font programs used in the document.
            //// This setting has no effect on the RTF renderer.
            //// (The term 'font program' is used by Adobe for a file containing a font. Technically a 'font file'
            //// is a collection of small programs and each program renders the glyph of a character when executed.
            //// Using a font in PDFsharp may lead to the embedding of one or more font programms, because each outline
            //// (regular, bold, italic, bold+italic, ...) has its own fontprogram)
            //const PdfFontEmbedding embedding = PdfFontEmbedding.Always;

            //// ========================================================================================

            //// Create a renderer for the MigraDoc document.
            //PdfDocumentRenderer pdfRenderer = new PdfDocumentRenderer(unicode, embedding);
            //// Associate the MigraDoc document with a renderer
            //pdfRenderer.Document = document1;
            string imageLoc = System.Web.HttpContext.Current.Server.MapPath("~/img/male.jpg");
            string htmlContent = String.Format( @"<table style='width: 100%;'>
                                    <tbody>
                                    <tr>
                                    <td><img style='height: 75px;' src='"+ imageLoc + @"' /></td>
                                    <td>
                                        <div style='font-size: 20px;'>BD GREEN</div>
                                        <div style='font-size: 10px;'>Homes Pvt Ltd.</div>
                                    </td>
                                    </tr>
                                    </tbody>
                                    </table>
                                    <table style='width: 100%;border-bottom: 1px solid black;'>
                                    <tbody>
                                    <tr>
                                        <td colspan='4' style='text-align: center;font-weight: bold; border-bottom: 1px solid black;padding:5px;'>Communication Details</td>
                                    </tr>
                                    <tr>
                                        <td style='background-color: #dbdbdb;width: 25%;font-weight: bold;padding:5px;'>Name</td>
                                        <td style='width: 25%;padding:5px;'>{0}</td>
                                        <td style='background-color: #dbdbdb;width: 25%;font-weight: bold;padding:5px;'>Contact No</td>
                                        <td style='width: 25%;padding:5px;'>{1}</td>
                                    </tr>
                                    <tr>
                                        <td style='background-color: #dbdbdb;width: 25%;font-weight: bold;padding:5px;'>Email</td>
                                        <td style='width: 25%;padding:5px;'>{2}</td>
                                        <td style='background-color: #dbdbdb;width: 25%;font-weight: bold;padding:5px;'>ID</td>
                                        <td style='width: 25%;padding:5px;'>{3}</td>
                                    </tr>
                                    <tr>
                                        <td style='background-color: #dbdbdb;width: 25%;font-weight: bold;padding:5px;'>Source</td>
                                        <td style='width: 25%;padding:5px;'>{4}</td>
                                    </tr>
                                    </tbody>
                                    </table>", leadDtl.leadName, leadDtl.leadContact, leadDtl.leadEmail.Trim(), leadDtl.leadID,leadDtl.leadSource);

            StringBuilder sb = new StringBuilder();
            sb.AppendLine(htmlContent);

            sb.AppendLine(@"<div style='width: 100%;'>");

            foreach(LeadMsg m in msg)
            {
                sb.AppendLine(@"<div style='width: 100%; background-color: #1f1fca; color: #fff; height:50px;margin-top:2px;padding: 10px;'>
                              <span style='font-size: 15px;'>" + m.message.Trim() + @"</span>
                            <br/>
  <span style='font-size: 10px;'>Posted By: " + m.postedBy + " on " + m.comDate.ToString("dd-MM-yyyy HH:mm") + @"</span>
</div>");
            }


            sb.AppendLine("</div>");
            return PdfGenerator.GeneratePdf(sb.ToString(), PageSize.A4);
           // pdf.Save("document.pdf");
           // // Layout and render document to PDF
           // pdfRenderer.RenderDocument();

           // // Save the document...
           //// const string filename = "HelloWorld.pdf";
           // //pdfRenderer.PdfDocument.Save(filename);
           // return pdfRenderer;
            // ...and start a viewer.
            //Process.Start(filename);
        }
/*
        private Document CreateDocument(Lead leadDtl, List<LeadMsg> msg)
        {

            // Create a new MigraDoc document
            document = new Document();
            document.Info.Title = "A sample invoice";
            document.Info.Subject = "Demonstrates how to create an invoice.";
            document.Info.Author = "Stefan Lange";

            DefineStyles();

            CreatePage(leadDtl, msg);

            //FillContent();

            return document;
            //// Create a new MigraDoc document
            //Document document = new Document();

            //// Add a section to the document
            //Section section = document.AddSection();

            //// Add a paragraph to the section
            //Paragraph paragraph = section.AddParagraph();

            //paragraph.Format.Font.Color = Color.FromCmyk(100, 30, 20, 50);

            //// Add some text to the paragraph
            //string imageLoc = System.Web.HttpContext.Current.Server.MapPath("~/img/male.jpg");
            //section.AddImage(imageLoc);
            //paragraph.AddFormattedText("Hello, World!", TextFormat.Bold);

            //return document;
        }

        private void DefineStyles()
        {
            // Get the predefined style Normal.
            Style style = document.Styles["Normal"];
            // Because all styles are derived from Normal, the next line changes the 
            // font of the whole document. Or, more exactly, it changes the font of
            // all styles and paragraphs that do not redefine the font.
            style.Font.Name = "Verdana";

            style = document.Styles[StyleNames.Header];
            style.ParagraphFormat.AddTabStop("8cm", TabAlignment.Right);

            style = document.Styles[StyleNames.Footer];
            style.ParagraphFormat.AddTabStop("8cm", TabAlignment.Center);

            // Create a new style called Table based on style Normal
            style = document.Styles.AddStyle("Table", "Normal");
            style.Font.Name = "Verdana";
            style.Font.Name = "Times New Roman";
            style.Font.Size = 9;

            // Create a new style called Reference based on style Normal
            style = document.Styles.AddStyle("Reference", "Normal");
            style.ParagraphFormat.SpaceBefore = "5mm";
            style.ParagraphFormat.SpaceAfter = "5mm";
            style.ParagraphFormat.TabStops.AddTabStop("8cm", TabAlignment.Right);
        }

        private void CreatePage(Lead leadDtl, List<LeadMsg> msg)
        {
            // Each MigraDoc document needs at least one section.
            Section section = document.AddSection();
            section.PageSetup.PageFormat = PageFormat.A4;

            // Put a logo in the header
            string imageLoc = System.Web.HttpContext.Current.Server.MapPath("~/img/male.jpg");
            Image image = section.AddImage(imageLoc);
            image.Height = "1.5cm";
            image.LockAspectRatio = true;
            image.RelativeVertical = RelativeVertical.Line;
            image.RelativeHorizontal = RelativeHorizontal.Margin;
            image.Top = "5mm";
            image.Left = ShapePosition.Left;
            image.WrapFormat.Style = WrapStyle.Through;

            // Create footer
            Paragraph paragraph = section.Footers.Primary.AddParagraph();
            paragraph.AddText("BD Green home");
            paragraph.Format.Font.Size = 7;
            paragraph.Format.Alignment = ParagraphAlignment.Center;

            // Create the text frame for the address
            addressFrame = section.AddTextFrame();
            addressFrame.Height = "3.0cm";
            addressFrame.Width = "7.0cm";
            addressFrame.Left = ShapePosition.Right;
            addressFrame.RelativeHorizontal = RelativeHorizontal.Margin;
            addressFrame.Top = "2.0cm";
            addressFrame.RelativeVertical = RelativeVertical.Page;

            // Put sender in address frame
            paragraph = addressFrame.AddParagraph("BD Green home");
            paragraph.Format.Font.Name = "Times New Roman";
            paragraph.Format.Font.Size = 25;
            paragraph.Format.SpaceAfter = 3;


            paragraph = section.AddParagraph();
            paragraph.Format.SpaceBefore = "2cm";
            paragraph.Style = "Reference";
            paragraph.AddText("_______________________________________________________________");
            paragraph.AddFormattedText("Name: ", TextFormat.Bold);
            paragraph.AddText(leadDtl.leadName);
            paragraph.AddTab();
            paragraph.AddFormattedText("Contact: ", TextFormat.Bold);
            paragraph.AddText(leadDtl.leadContact);
            paragraph.AddText("_______________________________________________________________");
            // Add the print date field
            paragraph = section.AddParagraph();
            paragraph.Format.SpaceBefore = "2cm";
            paragraph.Style = "Reference";
            paragraph.AddFormattedText("Communication details", TextFormat.Bold);
            //paragraph.AddTab();
            //paragraph.AddText("Date, ");
            //paragraph.AddDateField("dd.MM.yyyy");

            // Create the item table
            table = section.AddTable();
            table.Style = "Table";
            table.Borders.Color = Color.FromCmyk(0.47, 0.74, 0.07, 0.21);
            table.Borders.Width = 0.25;
            table.Borders.Left.Width = 0.5;
            table.Borders.Right.Width = 0.5;
            table.Rows.LeftIndent = 0;

            // Before you can add a row, you must define the columns
            Column column = table.AddColumn();
            column.Format.Alignment = ParagraphAlignment.Center;
            column.Width = document.DefaultPageSetup.PageWidth - document.DefaultPageSetup.LeftMargin - document.DefaultPageSetup.RightMargin;

            Font df = new Font();
            df.Size = "3mm";
            Font mf = new Font();
            mf.Size = "5mm";
            mf.Bold = false;
            foreach (LeadMsg lm in msg)
            {
                // Create the header of the table
                Row row = table.AddRow();
                row.HeadingFormat = true;
                row.Format.Alignment = ParagraphAlignment.Center;
                row.Format.Font.Bold = true;
                row.TopPadding = "5mm";
                row.Shading.Color = Color.FromCmyk(0.47, 0.74, 0.07, 0.21);
                row.Cells[0].AddParagraph().AddFormattedText(lm.message, mf);
                row.Cells[0].AddParagraph().AddFormattedText(lm.postedBy + " " + lm.comDate.ToString("dd-MM-yyyy"), df);
                row.Cells[0].AddParagraph("---------------------------------------------------------------");
                row.Cells[0].Format.Font.Bold = false;
                row.Cells[0].Format.Alignment = ParagraphAlignment.Left;
                row.Cells[0].VerticalAlignment = VerticalAlignment.Top;
                //row.Cells[0].MergeDown = 1;
            }

            table.SetEdge(0, 0, 1, 1, Edge.Box, BorderStyle.Single, 0.75, Color.Empty);
        }

        static void FillContent()
        {
            // Fill address in address text frame
            //XPathNavigator item = SelectItem("/invoice/to");
            Paragraph paragraph = addressFrame.AddParagraph();
            paragraph.AddText("Bangalore");
            paragraph.AddLineBreak();
            paragraph.AddText("kolkata");
            paragraph.AddLineBreak();
            paragraph.AddText("India");

            // Iterate the invoice items
            double totalExtendedPrice = 0;
            int i = 0;
           // XPathNodeIterator iter = this.navigator.Select("/invoice/items/*");
            while (i<5)
            { i++;
               // item = iter.Current;
                double quantity = 5;
                double price =100;
                double discount = 10;

                // Each item fills two rows
                Row row1 = table.AddRow();
                Row row2 = table.AddRow();
                row1.TopPadding = 1.5;
                row1.Cells[0].Shading.Color = Color.FromCmyk(0, 0, 0, 0.286);
                row1.Cells[0].VerticalAlignment = VerticalAlignment.Center;
                row1.Cells[0].MergeDown = 1;
                row1.Cells[1].Format.Alignment = ParagraphAlignment.Left;
                row1.Cells[1].MergeRight = 3;
                row1.Cells[5].Shading.Color = Color.FromCmyk(0, 0, 0, 0.286);
                row1.Cells[5].MergeDown = 1;

                row1.Cells[0].AddParagraph("#232232");
                paragraph = row1.Cells[1].AddParagraph();
                paragraph.AddFormattedText("BdGreen", TextFormat.Bold);
                paragraph.AddFormattedText(" by ", TextFormat.Italic);
                paragraph.AddText("shashank");
                row2.Cells[1].AddParagraph("1");
                row2.Cells[2].AddParagraph(price.ToString("0.00") + " €");
                row2.Cells[3].AddParagraph(discount.ToString("0.0"));
                row2.Cells[4].AddParagraph();
                row2.Cells[5].AddParagraph(price.ToString("0.00"));
                double extendedPrice = quantity * price;
                extendedPrice = extendedPrice * (100 - discount) / 100;
                row1.Cells[5].AddParagraph(extendedPrice.ToString("0.00") + " €");
                row1.Cells[5].VerticalAlignment = VerticalAlignment.Bottom;
                totalExtendedPrice += extendedPrice;

                table.SetEdge(0, table.Rows.Count - 2, 6, 2, Edge.Box, BorderStyle.Single, 0.75);
            }

            // Add an invisible row as a space line to the table
            Row row = table.AddRow();
            row.Borders.Visible = false;

            // Add the total price row
            row = table.AddRow();
            row.Cells[0].Borders.Visible = false;
            row.Cells[0].AddParagraph("Total Price");
            row.Cells[0].Format.Font.Bold = true;
            row.Cells[0].Format.Alignment = ParagraphAlignment.Right;
            row.Cells[0].MergeRight = 4;
            row.Cells[5].AddParagraph(totalExtendedPrice.ToString("0.00") + " €");

            // Add the VAT row
            row = table.AddRow();
            row.Cells[0].Borders.Visible = false;
            row.Cells[0].AddParagraph("VAT (19%)");
            row.Cells[0].Format.Font.Bold = true;
            row.Cells[0].Format.Alignment = ParagraphAlignment.Right;
            row.Cells[0].MergeRight = 4;
            row.Cells[5].AddParagraph((0.19 * totalExtendedPrice).ToString("0.00") + " €");

            // Add the additional fee row
            row = table.AddRow();
            row.Cells[0].Borders.Visible = false;
            row.Cells[0].AddParagraph("Shipping and Handling");
            row.Cells[5].AddParagraph(0.ToString("0.00") + " €");
            row.Cells[0].Format.Font.Bold = true;
            row.Cells[0].Format.Alignment = ParagraphAlignment.Right;
            row.Cells[0].MergeRight = 4;

            // Add the total due row
            row = table.AddRow();
            row.Cells[0].AddParagraph("Total Due");
            row.Cells[0].Borders.Visible = false;
            row.Cells[0].Format.Font.Bold = true;
            row.Cells[0].Format.Alignment = ParagraphAlignment.Right;
            row.Cells[0].MergeRight = 4;
            totalExtendedPrice += 0.19 * totalExtendedPrice;
            row.Cells[5].AddParagraph(totalExtendedPrice.ToString("0.00") + " €");

            // Set the borders of the specified cell range
            table.SetEdge(5, table.Rows.Count - 4, 1, 4, Edge.Box, BorderStyle.Single, 0.75);

            // Add the notes paragraph
            paragraph = document.LastSection.AddParagraph();
            paragraph.Format.SpaceBefore = "1cm";
            paragraph.Format.Borders.Width = 0.75;
            paragraph.Format.Borders.Distance = 3;
            paragraph.Format.Borders.Color = Color.FromCmyk(0, 0.024, 0.024, 0.518);
            paragraph.Format.Shading.Color = Color.FromCmyk(0, 0, 0, 0.286);
           // item = SelectItem("/invoice");
            paragraph.AddText("item not exchanges");
        }

    */
    }
}