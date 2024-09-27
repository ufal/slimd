var slimd = {
  root: document.currentScript.src.replace(/\/?[^\/]*$/, "/"),

  init: function(md, root) {
    // The following line is slightly modified and minified version on https://github.com/waylonflinn/markdown-it-katex.
    function markdownitkatex(r,e){function n(r,e){var n,t,c=r.posMax,i=!0,o=!0;return n=e>0?r.src.charCodeAt(e-1):-1,t=e+1<=c?r.src.charCodeAt(e+1):-1,(32===n||9===n||t>=48&&t<=57)&&(o=!1),32!==t&&9!==t||(i=!1),{can_open:i,can_close:o}}e=e||{};r.inline.ruler.after("escape","math_inline",function(r,e){var t,c,i,o;if("$"!==r.src[r.pos])return!1;if(!n(r,r.pos).can_open)return e||(r.pending+="$"),r.pos+=1,!0;for(c=t=r.pos+1;-1!==(c=r.src.indexOf("$",c));){for(o=c-1;"\\"===r.src[o];)o-=1;if((c-o)%2==1)break;c+=1}return-1===c?(e||(r.pending+="$"),r.pos=t,!0):c-t==0?(e||(r.pending+="$$"),r.pos=t+1,!0):n(r,c).can_close?(e||((i=r.push("math_inline","math",0)).markup="$",i.content=r.src.slice(t,c)),r.pos=c+1,!0):(e||(r.pending+="$"),r.pos=t,!0)}),r.block.ruler.after("blockquote","math_block",function(r,e,n,t){var c,i,o,s,a,l=!1,u=r.bMarks[e]+r.tShift[e],p=r.eMarks[e];if(u+2>p)return!1;if("$$"!==r.src.slice(u,u+2))return!1;if(u+=2,c=r.src.slice(u,p),t)return!0;for("$$"===c.trim().slice(-2)&&(c=c.trim().slice(0,-2),l=!0),o=e;!(l||++o>=n||(u=r.bMarks[o]+r.tShift[o])<(p=r.eMarks[o])&&r.tShift[o]<r.blkIndent);)"$$"===r.src.slice(u,p).trim().slice(-2)&&(s=r.src.slice(0,p).lastIndexOf("$$"),i=r.src.slice(u,s),l=!0);return r.line=o+1,(a=r.push("math_block","math",0)).block=!0,a.content=(c&&c.trim()?c+"\n":"")+r.getLines(e+1,o,r.tShift[e],!0)+(i&&i.trim()?i:""),a.map=[e,r.line],a.markup="$$",!0},{alt:["paragraph","reference","blockquote","list"]}),r.renderer.rules.math_inline=function(r,n){return function(r){e.displayMode=!1;try{return katex.renderToString(r,e)}catch(n){return e.throwOnError&&console.log(n),r}}(r[n].content)},r.renderer.rules.math_block=function(r,n){return function(r){e.displayMode=!0;try{return"<p>"+katex.renderToString(r,e)+"</p>"}catch(n){return e.throwOnError&&console.log(n),r}}(r[n].content)+"\n"}}

    // Init markdown-it with KaTeX and highlight.js
    this.md=markdownit({
      html: true,
      xhtmlOut: false,
      breaks: false,
      linkify: true,
      typographer: false,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang))
          return "<pre class='hljs'><code>" + hljs.highlight(lang, str, true).value + "</code></pre>";
        return "<pre class='hljs'><code>" + this.md.utils.escapeHtml(str) + "</code></pre>";
      }
    });
    this.md.use(markdownitkatex, {macros: {
      "\\sign": "\\mathop{\\operatorname{sign}}",
      "\\argmax": "\\mathop{\\operatorname{arg\\,max}}\\limits",
      "\\argmin": "\\mathop{\\operatorname{arg\\,min}}\\limits",
      "\\softmax": "\\mathop{\\operatorname{softmax}}",
      "\\ReLU": "\\mathop{\\operatorname{ReLU}}",
      "\\var": "\\mathop{\\operatorname{var}}", "\\Var": "\\mathop{\\operatorname{Var}}",
      "\\cov": "\\mathop{\\operatorname{cov}}", "\\Cov": "\\mathop{\\operatorname{Cov}}",
      "\\d": "\\,\\textrm{d}",
      "\\accuracy": "\\mathrm{accuracy}",
      "\\precision": "\\mathrm{precision}", "\\recall": "\\mathrm{recall}",
      "\\TP": "\\mathit{TP}", "\\FP": "\\mathit{FP}", "\\TN": "\\mathit{TN}", "\\FN": "\\mathit{FN}",
      "𝔸": "\\mathbb{A}", "𝔹": "\\mathbb{B}", "𝔻": "\\mathbb{D}", "𝔼": "\\mathbb{E}", "𝔽": "\\mathbb{F}", "𝔾": "\\mathbb{G}", "𝕀": "\\mathbb{I}", "𝕁": "\\mathbb{J}", "𝕂": "\\mathbb{K}", "𝕃": "\\mathbb{L}", "𝕄": "\\mathbb{M}", "𝕆": "\\mathbb{O}", "𝕊": "\\mathbb{S}", "𝕋": "\\mathbb{T}", "𝕌": "\\mathbb{U}", "𝕍": "\\mathbb{V}", "𝕎": "\\mathbb{W}", "𝕏": "\\mathbb{X}", "𝕐": "\\mathbb{Y}",
      "𝓐": "\\mathcal{A}", "𝓑": "\\mathcal{B}", "𝓒": "\\mathcal{C}", "𝓓": "\\mathcal{D}", "𝓔": "\\mathcal{E}", "𝓕": "\\mathcal{F}", "𝓖": "\\mathcal{G}", "𝓗": "\\mathcal{H}", "𝓘": "\\mathcal{I}", "𝓙": "\\mathcal{J}", "𝓚": "\\mathcal{K}", "𝓛": "\\mathcal{L}", "𝓜": "\\mathcal{M}", "𝓝": "\\mathcal{N}", "𝓞": "\\mathcal{O}", "𝓟": "\\mathcal{P}", "𝓠": "\\mathcal{Q}", "𝓡": "\\mathcal{R}", "𝓢": "\\mathcal{S}", "𝓣": "\\mathcal{T}", "𝓤": "\\mathcal{U}", "𝓥": "\\mathcal{V}", "𝓦": "\\mathcal{W}", "𝓧": "\\mathcal{X}", "𝓨": "\\mathcal{Y}", "𝓩": "\\mathcal{Z}",
      "≝": "\\stackrel{\\tiny\\textrm{def}}{=}",
      "\\@ifspace": function (context) {
        var args = context.consumeArgs(2);
        return {tokens: !context.future().text.trim() ? args[0] : args[1], numArgs: 0}; },
      "→": "\\@ifspace{\\rightarrow}{\\boldsymbol}",
      "⇉": "\\@ifspace{\\rightrightarrows}{\\boldsymbol}",
      "⇶": "\\@ifspace{\\overrightarrow{\\overrightarrow{\\underrightarrow{}}}}{\\mathsf}",
      "⁇": "\\@ifnextchar{→}{\\@firstoftwo{\\mathbf}}{\\@ifnextchar{⇉}{\\@firstoftwo{\\mathbf}}{\\mathrm}}",
    }});

    // Parse source and fill slides with classes, sections and MD contents.
    this.slides = [];
    this.images = [];
    this.imagesMap = {};
    this.title = "";
    var sources = md.split(/\r?\n(---[ -]*?|~~~[ ~]*?)(?:\r?\n|$)/g);
    for (var i = 0, slide = 1; i < sources.length; i += 2) {
      var source = "";
      if (i) {
        // Handle correct origin and slide number
        var origin_index = 0;
        if (sources[i - 1].startsWith("---")) {
          slide += 1;
          origin_index = sources[i - 1].replace(/[^-]/g, "").length - 3;
        }
        if (sources[i - 1].startsWith("~~~")) {
          origin_index = sources[i - 1].replace(/[^~]/g, "").length - 3;
          if (origin_index <= 1) origin_index = 1 - origin_index;
          this.slides[this.slides.length - 1].hasContinuation = true;
        }
        if (origin_index && origin_index <= this.slides.length)
          source = this.slides[this.slides.length - origin_index].source;
      }
      source += sources[i] + "\n";

      // Generate slide id
      var slideId = slide.toString();
      if (i + 1 < sources.length && sources[i + 1].startsWith("~~~")) {
        if (!this.slides.length || this.slides[this.slides.length - 1].number < slide) {
          slideId = slide + ".1";
        } else {
          slideId = slide + "." + (parseInt(this.slides[this.slides.length - 1].id.split(".").pop()) + 1).toString();
        }
      }

      // Parse allowed "key: value" pairs
      var section = "", classes = [], style="", md = source;
      for (var match; match = md.match(/^(title|section|class|style):([^\n]*?)\r?\n/i); md = md.replace(/^[^\n]*?\n/, "")) {
        switch(match[1]) {
          case "title":
            this.title = this.title || match[2].trim();
            break;
          case "section":
            section = match[2].trim();
            break;
          case "class":
            classes = match[2].split(/,/).map(x => x.trim()).filter(x => x);
            break;
          case "style":
            style += match[2].trim();
            break;
        }
      }
      if (style && this.slides.length) {
        // Add fences to styles defined in all but the first slide
        var fence = " #slimd-slide-" + slideId + " ";
        style = fence + style.replace(/([},])(?=[^}]*{)/g, "$1" + fence);
      }

      // Process advanced image links
      md = md.replace(/!\[(w=[^\]]*)\]\(([^)]*)\)/g, function (match, options, url) {
        var args = {w: null, mw: null, mh: null, h: null, v: null, f: null};
        options = options.split(/,/).map(x => x.split(/=/).map(y => y.trim()));
        for (var i in options) {
          if (options[i].length != 2 || !(options[i][0] in args)) return match;
          args[options[i][0]] = options[i][1];
        }
        if (args.h && !args.mw) args.mw = "100%";
        if (args.v && !args.mh) args.mh = "100%";
        if (!args.mw) { args.mw = args.w; args.w = "100%"; }
        if (!url.startsWith("/") && url.search("//") < 0) url = root + url;
        if (!(url in this.imagesMap)) { this.images.push(url);  this.imagesMap[url] = this.images.length; }
        return "<div class='slimd-image-container' style='width:" + args.mw + (args.mh ? ";height:" + args.mh : "") +
          (args.f ? ";float:" + args.f : "") + "'>" +
          "<span style='" + (args.h ? "text-align:" + args.h : "") + (args.v ? ";vertical-align:" + args.v : "") + "'>" +
          "<img class='slimd-image-" + this.imagesMap[url] +"' src='" + url + "' style='width:" + args.w + ";vertical-align:top'>" +
          "</span></div>";
      }.bind(this));

      this.slides.push({
        number: slide,
        id: slideId,
        section: section,
        classes: classes,
        style: style,
        source: source,
        md: md,
        hasContinuation: false,
      });
    }

    // Create the presentation DOM using the template
    this.template = slimd_template.apply(null, this.template_args);
    this.template.init(this);

    this.presentation = document.createElement("div");
    this.presentation.className = "slimd-presentation";

    for (var i = 0; i < this.slides.length; i++) {
      var slide = document.createElement("div");
      slide.className = "slimd-slide";
      slide.id = "slimd-slide-" + this.slides[i].id;
      if (this.slides[i].hasContinuation) slide.className += " has-continuation";
      if (this.slides[i].classes.length) slide.className += " " + this.slides[i].classes.join(" ");

      this.template.render(this, i, slide);

      this.presentation.appendChild(slide);
    }

    // Parse URL fragment
    this.currentSlide = 0;
    this.currentSlideId = "";
    this.currentFragment = "";
    this.parseFragment();
    if (!this.currentSlide) this.setSlide(1, +1);
    window.addEventListener("hashchange", this.parseFragment.bind(this));

    // Add the presentation
    document.body.appendChild(this.presentation);

    // Set scaling
    this.resizePresentation();
    window.addEventListener("resize", this.resizePresentation.bind(this));

    // Create controls
    var self = this;
    window.addEventListener("wheel", function(e) {
      if (e.deltaY < 0) self.setSlide(self.currentSlide - 1, -1);
      if (e.deltaY > 0) self.setSlide(self.currentSlide + 1, +1);
    });
    window.addEventListener("keydown", function(e) {
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          self.setSlide(self.currentSlide - 1, -1);
          break;
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          self.setSlide(self.currentSlide + 1, +1);
          break;
        case "Home":
          self.setSlide(1, +1);
          break;
        case "End":
          self.setSlide(self.slides.length, -1);
          break;
        case "h":
          self.toggleFragmentElement("handout");
          break;
        case "b":
          self.toggleFragmentElement("backgroundless");
          break;
        case ".":
          self.toggleFragmentElement("blank");
          break;
        case "4":
          self.toggleFragmentElement("a4", "m43");
          break;
        case "3":
          self.toggleFragmentElement("m43", "a4");
          break;
      }
    });
    window.addEventListener("touchstart", function(e) {
      self.touchStartX = e.touches.length == 1 ? e.touches[0].clientX : null;
    });
    window.addEventListener("touchend", function(e) {
      if (e.target.nodeName.toUpperCase() == "A" || self.touchStartX === null) return;
      var touchEndX = e.changedTouches[0].clientX;
      if (touchEndX > self.touchStartX + 50) self.setSlide(self.currentSlide - 1, -1);
      if (touchEndX < self.touchStartX - 50) self.setSlide(self.currentSlide + 1, +1);
    });

    // Load image references
    for (var i = 0; i < this.images.length; i++) {
      (function (self, i) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", self.images[i] + ".ref", true);
        xhr.responseType = "text";
        xhr.onload = function() { if (xhr.status === 200 && xhr.responseText) {
          var elements = document.getElementsByClassName("slimd-image-" + (i + 1));
          for (var e = 0; e < elements.length; e++) {
            var ref = document.createElement("span");
            ref.className = "slimd-image-reference";
            ref.style.display = "inline-block";
            ref.style.minWidth = elements[e].style.width;
            ref.appendChild(document.createTextNode(xhr.responseText));
            elements[e].parentNode.appendChild(document.createElement("br"));
            elements[e].parentNode.appendChild(ref);
        }}};
        xhr.send();
      })(this, i);
    }
  },

  parseFragment: function() {
    var fragment = window.location.hash.substr(1);
    var fragmentSlideId = fragment.match(/^\d+\.?\d*/);
    var fragmentSlide = 1;
    if (fragmentSlideId && fragmentSlideId[0] == this.currentSlideId) {
      fragmentSlide = this.currentSlide;
    } else if (fragmentSlideId) {
      for (var i = 0; i < this.slides.length; i++)
        if (fragmentSlideId[0] == this.slides[i].id) {
          fragmentSlide = i + 1;
          break;
        }
    }
    fragmentSlideId = this.slides[fragmentSlide - 1].id;
    fragment = fragment.replace(/^\d+\.?\d*,*/, "");
    if (fragment) fragment = "," + fragment;

    if (fragment != this.currentFragment) {
      var classes = fragment.split(",").map(x => x.trim()).filter(x => x);
      this.presentation.className = "slimd-presentation" + (classes.length ? " " + classes.join(" ") : "");
      this.currentFragment = fragment;
      this.resizePresentation();
      this.setSlide(fragmentSlide, +1);
    } else if (fragmentSlideId != this.currentSlideId) {
      this.setSlide(fragmentSlide, +1);
    }
  },

  setSlide: function(slide, changeDirection) {
    if (slide >= 1 && slide <= this.slides.length) {
      if (this.currentFragment.search(/(?:^|,)handout(?=,|$)/i) >= 0) {
        while (slide > 1 && this.slides[slide - 1].hasContinuation) slide += changeDirection;
        while (this.slides[slide - 1].hasContinuation) slide += 1;
      }
      if (slide != this.currentSlide) {
        var visibles = this.presentation.getElementsByClassName("slimd-slide-visible");
        for (var i = 0; i < visibles.length; i++) visibles[i].classList.remove("slimd-slide-visible");
        this.presentation.getElementsByClassName("slimd-slide")[slide - 1].classList.add("slimd-slide-visible");
        this.currentSlide = slide;
        this.currentSlideId = this.slides[this.currentSlide - 1].id;
        window.location.replace("#" + this.currentSlideId + this.currentFragment);
      }
    }
  },

  toggleFragmentElement: function(element, conflicting) {
    var re = new RegExp("(?:^|,)" + element + "(?=,|$)", "gi");
    var fragment = re.test(this.currentFragment) ? this.currentFragment.replace(re, "") : this.currentFragment + "," + element;
    if (conflicting) fragment = fragment.replace(new RegExp("(?:^|,)" + conflicting + "(?=,|$)", "gi"), "");
    window.location.replace("#" + this.currentSlideId + fragment);
  },

  resizePresentation: function() {
    if (!this.presentation.parentNode) return;

    var factor = Math.min(document.documentElement.clientWidth / this.presentation.offsetWidth, document.documentElement.clientHeight / this.presentation.offsetHeight);
    var moveX = (document.documentElement.clientWidth - this.presentation.offsetWidth) / 2;
    var moveY = (document.documentElement.clientHeight - this.presentation.offsetHeight) / 2;
    this.presentation.style.transform = "translate(" + moveX + "px," + moveY + "px) scale(" + factor + "," + factor + ")";
    this.presentation.style.transformOrigin = "50% 50%";

    if (!this.pageStyle) {
      this.pageStyle = document.createElement("style");
      document.head.appendChild(this.pageStyle);
    }
    this.pageStyle.innerHTML = "@page { margin: 0 0; size: " + (this.presentation.offsetWidth + 1) + "px " + (this.presentation.offsetHeight + 1) + "px}";
  },

  loadAndInit: function(css, js, md) {
    while (css.length) {
      var link = document.createElement("link");
      link.href = css.shift();
      link.type = "text/css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    if (js.length) {
      var script = document.createElement("script");
      script.src = js.shift();
      script.type = "text/javascript";
      script.onload = this.loadAndInit.bind(this, css, js, md);
      document.head.appendChild(script);
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.slimd = this;
    xhr.open("GET", md, true);
    xhr.responseType = "text";
    xhr.onload = function() { if (xhr.status === 200) this.slimd.init.call(this.slimd, xhr.responseText, md.replace(/[^\/]*$/, "")); }
    xhr.send();
  },

  start: function(md, template/*, ...template_args*/) {
    this.loadAndInit([this.root + "res/katex/katex.min.css",
                      this.root + "slimd.css",
                     ],
                     [this.root + "res/markdown-it/markdown-it.min.js",
                      this.root + "res/highlight/highlight.min.js",
                      this.root + "res/katex/katex.min.js",
                      template,
                     ],
                     md);
    this.template_args = Array.prototype.slice.call(arguments, 2);
  },
}
