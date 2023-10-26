var slimd_template = (function(currentScript) {
  return function (css_overrides) {
    return {
      root: currentScript.src.replace(/\/?[^\/]*$/, "/"),

      init: function(slimd) {
        document.title = slimd.title;

        var links = document.createDocumentFragment()
        for (var css of (css_overrides || []).concat(["ufal"])) {
          var link = document.createElement("link");
          link.href = this.root + "ufal/" + css + ".css";
          link.type = "text/css";
          link.rel = "stylesheet";
          links.append(link);
        }
        document.head.appendChild(links);
      },

      render: function(slimd, slide, div) {
        // Embed slide CSS
        if (slimd.slides[slide].style) {
          var style = document.createElement("style");
          style.innerHTML = slimd.slides[slide].style;
          div.appendChild(style);
        }
        // Create elements for header, content and footer
        var header = document.createElement("div"); header.className = "slimd-ufal-header";
        var content = document.createElement("div"); content.className = "slimd-ufal-content";
        var innerContent = document.createElement("div"); innerContent.className = "slimd-ufal-content-inner";
        var footer = document.createElement("div"); footer.className = "slimd-ufal-footer";

        // For non-title slide, interpret first H1 as header title
        var titleSlide = false;
        for (var i in slimd.slides[slide].classes)
          titleSlide = titleSlide || slimd.slides[slide].classes[i] == "title";

        var md = slimd.slides[slide].md, title = "";
        if (titleSlide) {
          title = slimd.title;
        } else {
          var match = md.match(/^(?:\s*\n|^)# ([^\n]*)\n?/);
          if (match) {
            title = match[1];
            md = md.substr(match[0].length);
          }
        }

        // Is this a dangerous bend slide?
        var dbendSlide = false;
        for (var i in slimd.slides[slide].classes)
          dbendSlide = dbendSlide || slimd.slides[slide].classes[i] == "dbend";

        // Render the title and the content
        if (title) header.innerHTML = slimd.md.render(title)
        innerContent.innerHTML =
          (dbendSlide ? "<img src='" + this.root + "ufal/images/dbend.svg' class='slimd-ufal-dbend'>" : "") + slimd.md.render(md)
        content.appendChild(innerContent);

        // Render footer
        if (titleSlide) {
          var logos = document.createElement("div"); logos.className = "slimd-ufal-footer-logos"; footer.appendChild(logos);
          var school = document.createElement("div"); school.className = "slimd-ufal-footer-school"; footer.appendChild(school);
          var license = document.createElement("div"); license.className = "slimd-ufal-footer-license"; footer.appendChild(license);
        } else {
          var slideNumber = document.createElement("div"); slideNumber.className = "slimd-ufal-slide-number";
          slideNumber.innerHTML = slimd.slides[slide].number + "/" + slimd.slides[slimd.slides.length - 1].number;
          footer.appendChild(slideNumber);

          if (slimd.title) {
            var footerTitle = document.createElement("div"); footerTitle.className = "slimd-ufal-footer-title";
            footerTitle.innerHTML = slimd.md.render(slimd.title);
            footerTitle.style.cursor = "pointer";
            footerTitle.addEventListener("click", slimd.setSlide.bind(slimd, 1, +1));
            footer.appendChild(footerTitle);
          }

          var currentSection = slide, sections = {};
          while (currentSection >= 0 && !slimd.slides[currentSection].section) currentSection--;
          currentSection = currentSection >= 0 ? slimd.slides[currentSection].section : null;
          for (var i = 0; i < slimd.slides.length; i++)
            if (slimd.slides[i].section && !(slimd.slides[i].section in sections)) {
              var section = document.createElement("div"); section.className = "slimd-ufal-footer-section";
              if (slimd.slides[i].section == currentSection) section.className += " slimd-ufal-footer-section-active";
              section.innerHTML = slimd.md.render(slimd.slides[i].section);
              section.style.cursor = "pointer";
              section.addEventListener("click", (function(slide) { slimd.setSlide(slide, +1); }).bind(this, i + 1));
              footer.appendChild(section);
              sections[slimd.slides[i].section] = 1;
            }
        }

        // Append header, content and footer to the slide
        div.appendChild(header);
        div.appendChild(content);
        div.appendChild(footer);
      }
    };
  };
})(document.currentScript);
