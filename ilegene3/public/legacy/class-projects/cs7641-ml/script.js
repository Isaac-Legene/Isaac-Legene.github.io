// MineTrack site functionality

const bibliographyDatabase = {
    "scaramuzza2011": "D. Scaramuzza and F. Fraundorfer, 'Visual Odometry [Tutorial],' IEEE Robotics & Automation Magazine, vol. 18, no. 4, pp. 80-92, Dec. 2011. doi: 10.1109/MRA.2011.943233.",
    "nister2004": "D. Nister, O. Naroditsky, and J. Bergen, 'Visual odometry,' in Proceedings of the 2004 IEEE Computer Society Conference on Computer Vision and Pattern Recognition, 2004, vol. 1, pp. I-652-I-659. doi: 10.1109/CVPR.2004.1315094.",
    "orbslam2015": "R. Mur-Artal, J. M. M. Montiel, and J. D. Tardos, 'ORB-SLAM: A Versatile and Accurate Monocular SLAM System,' IEEE Transactions on Robotics, vol. 31, no. 5, pp. 1147-1163, Oct. 2015. doi: 10.1109/TRO.2015.2463671.",
    "minecraft2011": "Mojang Studios, 'Minecraft', 2011. [Video game].",
    "wang2018": "S. Wang, R. Clark, H. Wen, and N. Trigoni, 'End-to-end, sequence-to-sequence probabilistic visual odometry through deep neural networks,' The International Journal of Robotics Research, vol. 37, no. 4-5, pp. 513-542, Apr. 2018. doi: 10.1177/0278364917734298.",
    "deepvo2017": "S. Wang, R. Clark, H. Wen, and N. Trigoni, 'DeepVO: Towards End-to-End Visual Odometry with Deep Recurrent Convolutional Neural Networks,' in 2017 IEEE International Conference on Robotics and Automation (ICRA), 2017, pp. 2043-2050. doi: 10.1109/ICRA.2017.7989236.",
    "modality2023": "M. Memmel, R. Bachmann, and A. Zamir, 'Modality-Invariant Visual Odometry for Embodied Vision,' presented at the Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2023, pp. 21549-21559. Accessed: Feb. 25, 2026. [Online]. Available: https://openaccess.thecvf.com/content/CVPR2023/html/Memmel_Modality-Invariant_Visual_Odometry_for_Embodied_Vision_CVPR_2023_paper.html",
    "endtoend2025": "A. O. Francani and M. R. O. A. Maximo, 'Transformer-Based Model for Monocular Visual Odometry: A Video Understanding Approach,' IEEE Access, vol. 13, pp. 13959-13971, 2025. doi: 10.1109/ACCESS.2025.3531667.",
    "metrics2014": "T. Ciarfuglia, G. Costante, P. Valigi, and E. Ricci, 'Evaluation for non-geometric methods for visual odometry,' Robotics and Autonomous Systems, vol. 62, issue 12, p. 1717, August 2014. Available: https://doi.org/10.1016/j.robot.2014.08.001",
    "kitti": "A. Geiger, P. Lenz, and R. Urtasun, 'Are we ready for autonomous driving? The KITTI vision benchmark suite,' in 2012 IEEE Conference on Computer Vision and Pattern Recognition, Jun. 2012, pp. 3354-3361. doi: 10.1109/CVPR.2012.6248074.",
    "pose": "J. Sturm, N. Engelhard, F. Endres, W. Burgard, and D. Cremers, 'A benchmark for the evaluation of RGB-D SLAM systems,' in 2012 IEEE/RSJ International Conference on Intelligent Robots and Systems, Oct. 2012, pp. 573-580. doi: 10.1109/IROS.2012.6385773.",
    "moratuwage2016": "A. M. Moratuwage, D. Wang, and S. Wang, 'Review of visual odometry types, approaches, challenges and applications,' SpringerPlus, vol. 5, no. 1, 2016.",
    "monocularsurvey2023": "E. P. Herrera-Granda, J. C. Torres-Cantero, and D. H. Peluffo-Ordonez, 'Monocular Visual SLAM, Visual Odometry, and Structure from Motion Methods Applied to 3D Reconstruction: A Comprehensive Survey,' SSRN, 2023. doi: 10.2139/ssrn.4546921.",
    "monocularsurvey2024": "E. P. Herrera-Granda, J. C. Torres-Cantero, and D. H. Peluffo-Ordonez, 'Monocular Visual SLAM, Visual Odometry, and Structure from Motion Methods Applied to 3D Reconstruction: A Comprehensive Survey,' Heliyon, vol. 10, no. 18, e37356, Sep. 2024. doi: 10.1016/j.heliyon.2024.e37356.",
    "nnsvg": "A. LeNail, 'NN-SVG: Publication-Ready Neural Network Architecture Schematics,' 2019. [Online]. Available: https://alexlenail.me/NN-SVG/"
};

document.addEventListener("DOMContentLoaded", function () {
    initNavShadow();
    initFadeAnimations();
    initSmoothScrolling();
    initArchiveDropdown();
    initScrollSpy();
    initCitations();
    initGanttChart();
    initImageLightbox();
});

const ganttSchedule = [
    { title: "Project Team Composition", owner: "All", start: "2026-02-02", due: "2026-02-06", phase: "proposal" },
    { title: "Introduction & Background", owner: "Ojas", start: "2026-02-09", due: "2026-02-27", phase: "proposal" },
    { title: "Problem Definition", owner: "Isaac & Edmond", start: "2026-02-09", due: "2026-02-27", phase: "proposal" },
    { title: "Methods", owner: "Aaron, Auryn, Edmond", start: "2026-02-16", due: "2026-02-27", phase: "proposal" },
    { title: "Potential Dataset", owner: "Aaron & Auryn", start: "2026-02-14", due: "2026-02-27", phase: "proposal" },
    { title: "Potential Results & Discussion", owner: "Aaron & Auryn", start: "2026-02-23", due: "2026-02-27", phase: "proposal" },
    { title: "Dataset Collection", owner: "All", start: "2026-02-14", due: "2026-02-27", phase: "proposal" },
    { title: "Video Creation & Recording", owner: "All", start: "2026-02-09", due: "2026-02-27", phase: "proposal" },
    { title: "GitHub Page", owner: "Ojas & Isaac", start: "2026-02-09", due: "2026-02-27", phase: "proposal" },
    { title: "Model 1 (M1) Design & Selection", owner: "Aaron & Auryn and Ojas", start: "2026-02-28", due: "2026-03-20", phase: "midterm" },
    { title: "M1 Data Cleaning", owner: "Isaac", start: "2026-02-28", due: "2026-03-16", phase: "midterm" },
    { title: "M1 Data Visualization", owner: "Isaac & Edmond", start: "2026-02-28", due: "2026-03-20", phase: "midterm" },
    { title: "M1 Feature Reduction", owner: "Edmond", start: "2026-02-28", due: "2026-03-20", phase: "midterm" },
    { title: "M1 Implementation & Coding", owner: "All", start: "2026-02-28", due: "2026-03-20", phase: "midterm" },
    { title: "M1 Results Evaluation", owner: "All", start: "2026-03-17", due: "2026-03-20", phase: "midterm" },
    { title: "Model 2 (M2) Design & Selection", owner: "Aaron & Auryn and Ojas", start: "2026-02-28", due: "2026-03-20", phase: "midterm" },
    { title: "M2 Data Cleaning", owner: "Isaac", start: "2026-02-28", due: "2026-03-16", phase: "midterm" },
    { title: "M2 Data Visualization", owner: "Isaac & Edmond", start: "2026-02-28", due: "2026-03-20", phase: "midterm" },
    { title: "M2 Feature Reduction", owner: "Edmond", start: "2026-02-28", due: "2026-03-20", phase: "midterm" },
    { title: "M2 Coding & Implementation", owner: "All", start: "2026-02-28", due: "2026-03-20", phase: "midterm" },
    { title: "M2 Results Evaluation", owner: "All", start: "2026-03-17", due: "2026-03-20", phase: "midterm" },
    { title: "Midterm Report", owner: "All", start: "2026-02-28", due: "2026-03-20", phase: "midterm" },
    { title: "Model 3 (M3) Design & Selection", owner: "Aaron & Auryn and Ojas", start: "2026-03-21", due: "2026-03-30", phase: "final" },
    { title: "M3 Data Cleaning", owner: "Isaac", start: "2026-03-21", due: "2026-03-30", phase: "final" },
    { title: "M3 Data Visualization", owner: "Isaac & Edmond", start: "2026-03-30", due: "2026-04-10", phase: "final" },
    { title: "M3 Feature Reduction", owner: "Edmond", start: "2026-03-21", due: "2026-04-10", phase: "final" },
    { title: "M3 Implementation & Coding", owner: "All", start: "2026-03-21", due: "2026-04-10", phase: "final" },
    { title: "M3 Results Evaluation", owner: "All", start: "2026-04-11", due: "2026-04-28", phase: "final" },
    { title: "M1-M3 Comparison", owner: "All", start: "2026-04-13", due: "2026-04-28", phase: "final" },
    { title: "Video Creation & Recording", owner: "All", start: "2026-04-14", due: "2026-04-28", phase: "final" },
    { title: "Final Report", owner: "All", start: "2026-04-14", due: "2026-04-28", phase: "final" }
];

function initNavShadow() {
    const nav = document.querySelector("nav");
    if (!nav) {
        return;
    }

    const updateShadow = function () {
        nav.classList.toggle("scrolled", window.scrollY > 10);
    };

    updateShadow();
    window.addEventListener("scroll", updateShadow, { passive: true });
}

function initFadeAnimations() {
    const fadeElements = document.querySelectorAll(".fade-in");
    if (!fadeElements.length) {
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    fadeElements.forEach(function (element) {
        observer.observe(element);
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (event) {
            const href = this.getAttribute("href");
            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

function initArchiveDropdown() {
    const toggle = document.querySelector("[data-archive-toggle]");
    const panel = document.querySelector("[data-archive-panel]");
    const label = document.querySelector("[data-archive-label]");
    if (!toggle || !panel) {
        return;
    }

    const pageLabelMap = {
        "proposal.html": "Proposal",
        "midterm.html": "Midterm Checkpoint"
    };

    const currentPage = window.location.pathname.split("/").pop();
    const archivedLabel = pageLabelMap[currentPage];

    if (label && archivedLabel) {
        label.textContent = archivedLabel;
        toggle.classList.add("active");
        toggle.setAttribute("aria-current", "page");
    }

    const setOpenState = function (isOpen) {
        toggle.setAttribute("aria-expanded", String(isOpen));
        panel.hidden = false;
        panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : "0px";
        panel.style.opacity = isOpen ? "1" : "0";
        panel.classList.toggle("open", isOpen);

        if (!isOpen) {
            window.setTimeout(function () {
                if (!panel.classList.contains("open")) {
                    panel.hidden = true;
                }
            }, 260);
        }
    };

    setOpenState(false);

    toggle.addEventListener("click", function () {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        setOpenState(!isOpen);
    });
}

function initScrollSpy() {
    const scrollSpyContainer = document.querySelector("[data-scrollspy]");
    const reportMain = document.querySelector("[data-report-content]");
    if (!scrollSpyContainer || !reportMain) {
        return;
    }

    const sections = Array.from(reportMain.querySelectorAll("[data-spy-section]"));
    if (!sections.length) {
        return;
    }

    const list = document.createElement("ul");
    list.className = "scrollspy-list";
    scrollSpyContainer.classList.add("scrollspy-track");

    const links = [];
    const observedTargets = [];

    sections.forEach(function (section, sectionIndex) {
        if (!section.id) {
            section.id = "section-" + (sectionIndex + 1);
        }

        section.classList.add("section-anchor");

        const sectionHeading = section.querySelector("h2");
        const sectionLabel = section.getAttribute("data-nav-label") || (sectionHeading ? sectionHeading.textContent.trim() : "Section " + (sectionIndex + 1));
        const sectionLink = createScrollSpyItem(section.id, sectionLabel, "");
        list.appendChild(sectionLink.item);
        links.push({ target: section, link: sectionLink.link });
        observedTargets.push(section);

        const subsections = Array.from(section.querySelectorAll("h4"));
        subsections.forEach(function (subsection, subsectionIndex) {
            if (!subsection.id) {
                subsection.id = section.id + "-subsection-" + (subsectionIndex + 1);
            }

            subsection.classList.add("section-anchor");
            const subsectionLink = createScrollSpyItem(subsection.id, subsection.textContent.trim(), "subsection");
            list.appendChild(subsectionLink.item);
        });
    });

    scrollSpyContainer.replaceChildren(list);

    const setActiveLink = function (activeId) {
        links.forEach(function (entry) {
            const isActive = entry.target.id === activeId;
            entry.link.classList.toggle("active", isActive);
            if (isActive) {
                entry.link.setAttribute("aria-current", "true");
            } else {
                entry.link.removeAttribute("aria-current");
            }
        });
    };

    const observer = new IntersectionObserver(function (entries) {
        const visibleEntries = entries
            .filter(function (entry) { return entry.isIntersecting; })
            .sort(function (a, b) { return b.boundingClientRect.top - a.boundingClientRect.top; })
            .reverse();

        if (visibleEntries.length > 0) {
            setActiveLink(visibleEntries[0].target.id);
        }
    }, {
        rootMargin: "-18% 0px -68% 0px",
        threshold: [0, 0.2, 0.5, 1]
    });

    observedTargets.forEach(function (target) {
        observer.observe(target);
    });

    setActiveLink(observedTargets[0].id);

    const syncScrollSpyPosition = function () {
        const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
        const trackRange = scrollSpyContainer.scrollHeight - scrollSpyContainer.clientHeight;

        if (scrollRange <= 0 || trackRange <= 0) {
            scrollSpyContainer.scrollTop = 0;
            return;
        }

        const progress = Math.min(1, Math.max(0, window.scrollY / scrollRange));
        scrollSpyContainer.scrollTop = progress * trackRange;
    };

    syncScrollSpyPosition();
    window.addEventListener("scroll", syncScrollSpyPosition, { passive: true });
    window.addEventListener("resize", syncScrollSpyPosition, { passive: true });
}

function createScrollSpyItem(targetId, label, modifierClass) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#" + targetId;
    link.textContent = label;
    if (modifierClass) {
        link.classList.add("scrollspy-" + modifierClass);
    }
    item.appendChild(link);
    return { item: item, link: link };
}

function initCitations() {
    const citeElements = document.querySelectorAll(".cite");
    const bibliographySection = document.getElementById("bibliography-list");
    if (!citeElements.length || !bibliographySection) {
        return;
    }

    let currentCiteNumber = 1;
    const assignedNumbers = {};

    citeElements.forEach(function (element) {
        const refId = element.getAttribute("data-ref");
        if (!refId) {
            return;
        }

        if (!assignedNumbers[refId]) {
            assignedNumbers[refId] = currentCiteNumber++;

            const item = document.createElement("li");
            item.id = "ref-" + refId;
            item.innerHTML = "[" + assignedNumbers[refId] + "] " + (bibliographyDatabase[refId] || ("Citation missing for: " + refId));
            bibliographySection.appendChild(item);
        }

        element.innerHTML = '<a href="#ref-' + refId + '">[' + assignedNumbers[refId] + "]</a>";
    });
}

function initImageLightbox() {
    const clickableImages = Array.from(document.querySelectorAll("img"))
        .filter(function (image) {
            return !image.closest("[data-lightbox-ignore]") && image.closest("main");
        });

    if (!clickableImages.length) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.className = "image-lightbox";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = [
        '<div class="image-lightbox-backdrop" data-lightbox-close></div>',
        '<button type="button" class="image-lightbox-close" aria-label="Close image viewer" data-lightbox-close>&times;</button>',
        '<div class="image-lightbox-panel" role="dialog" aria-modal="true" aria-label="Expanded image">',
        '<img class="image-lightbox-image" alt="">',
        "</div>"
    ].join("");
    document.body.appendChild(overlay);

    const overlayImage = overlay.querySelector(".image-lightbox-image");
    const closeTargets = overlay.querySelectorAll("[data-lightbox-close]");
    let lastFocusedElement = null;
    const zoomLevels = [1, 1.5, 2.2, 3.0];
    let currentZoomIndex = 0;

    const updateZoomCursor = function () {
        overlayImage.classList.toggle("can-zoom-out", currentZoomIndex >= zoomLevels.length - 1);
    };

    const setZoom = function (targetIndex, originX, originY) {
        const clampedIndex = Math.max(0, Math.min(targetIndex, zoomLevels.length - 1));
        currentZoomIndex = clampedIndex;
        overlayImage.style.setProperty("--lightbox-zoom-scale", String(zoomLevels[currentZoomIndex]));

        if (typeof originX === "number" && typeof originY === "number") {
            overlayImage.style.setProperty("--lightbox-origin-x", originX.toFixed(3) + "%");
            overlayImage.style.setProperty("--lightbox-origin-y", originY.toFixed(3) + "%");
        }

        updateZoomCursor();
    };

    const getRelativeClickOrigin = function (event) {
        const rect = overlayImage.getBoundingClientRect();
        if (!rect.width || !rect.height) {
            return { x: 50, y: 50 };
        }

        const rawX = ((event.clientX - rect.left) / rect.width) * 100;
        const rawY = ((event.clientY - rect.top) / rect.height) * 100;

        return {
            x: Math.max(0, Math.min(100, rawX)),
            y: Math.max(0, Math.min(100, rawY))
        };
    };

    const closeOverlay = function () {
        if (!overlay.classList.contains("is-open")) {
            return;
        }

        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");

        window.setTimeout(function () {
            overlayImage.style.removeProperty("--lightbox-zoom-scale");
            overlayImage.style.removeProperty("--lightbox-origin-x");
            overlayImage.style.removeProperty("--lightbox-origin-y");
            overlayImage.src = "";
            overlayImage.alt = "";
            if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
                lastFocusedElement.focus();
            }
            lastFocusedElement = null;
            currentZoomIndex = 0;
            updateZoomCursor();
        }, 220);
    };

    const openOverlay = function (image) {
        if (!image || (!image.currentSrc && !image.src)) {
            return;
        }

        lastFocusedElement = document.activeElement;
        overlayImage.src = image.currentSrc || image.src;
        overlayImage.alt = image.alt || "Expanded image";
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");

        setZoom(0, 50, 50);

        if (!overlayImage.complete) {
            overlayImage.addEventListener("load", function handleImageLoad() {
                overlayImage.removeEventListener("load", handleImageLoad);
                setZoom(0, 50, 50);
            });
        }

        window.setTimeout(function () {
            const closeButton = overlay.querySelector(".image-lightbox-close");
            if (closeButton) {
                closeButton.focus();
            }
        }, 0);
    };

    clickableImages.forEach(function (image) {
        image.classList.add("clickable-image");
        image.setAttribute("role", "button");
        image.setAttribute("tabindex", "0");
        image.setAttribute("aria-label", image.alt ? "Open image: " + image.alt : "Open image in enlarged view");

        image.addEventListener("click", function () {
            openOverlay(image);
        });

        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openOverlay(image);
            }
        });
    });

    closeTargets.forEach(function (target) {
        target.addEventListener("click", closeOverlay);
    });

    overlayImage.addEventListener("click", function (event) {
        event.stopPropagation();
        const origin = getRelativeClickOrigin(event);

        if (currentZoomIndex < zoomLevels.length - 1) {
            setZoom(currentZoomIndex + 1, origin.x, origin.y);
            return;
        }

        setZoom(currentZoomIndex - 1, origin.x, origin.y);
    });

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeOverlay();
        }
    });

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeOverlay();
        }
    });

    window.addEventListener("resize", function () {
        if (!overlay.classList.contains("is-open")) {
            return;
        }
        setZoom(currentZoomIndex);
    }, { passive: true });
}

function initGanttChart() {
    const root = document.querySelector("[data-gantt-root]");
    if (!root) {
        return;
    }

    const chart = document.createElement("div");
    chart.className = "gantt-chart";

    const header = document.createElement("div");
    header.className = "gantt-chart-header";

    const heading = document.createElement("div");
    heading.className = "gantt-task-heading";
    heading.textContent = "Task / owner";
    header.appendChild(heading);

    const weekLabels = document.createElement("div");
    weekLabels.className = "gantt-week-labels";

    const projectStart = parseGanttDate("2026-02-02");
    const weekMs = 7 * 24 * 60 * 60 * 1000;

    for (let weekIndex = 0; weekIndex < 13; weekIndex += 1) {
        const weekLabel = document.createElement("span");
        weekLabel.textContent = formatGanttLabel(new Date(projectStart.getTime() + weekIndex * weekMs));
        weekLabels.appendChild(weekLabel);
    }

    header.appendChild(weekLabels);
    chart.appendChild(header);

    ganttSchedule.forEach(function (task) {
        const taskStart = parseGanttDate(task.start);
        const taskDue = parseGanttDate(task.due);
        const startSlot = Math.floor((taskStart.getTime() - projectStart.getTime()) / weekMs) + 1;
        const endSlot = Math.ceil((((taskDue.getTime() - projectStart.getTime()) / (24 * 60 * 60 * 1000)) + 1) / 7);
        const span = Math.max(1, endSlot - startSlot + 1);

        const row = document.createElement("div");
        row.className = "gantt-row";

        const meta = document.createElement("div");
        meta.className = "gantt-task-meta";

        const title = document.createElement("span");
        title.className = "gantt-task-title";
        title.textContent = task.title;

        const owner = document.createElement("span");
        owner.className = "gantt-task-owner";
        owner.textContent = task.owner + " | " + formatGanttLabel(taskStart) + " to " + formatGanttLabel(taskDue);

        meta.appendChild(title);
        meta.appendChild(owner);

        const track = document.createElement("div");
        track.className = "gantt-track";

        const bar = document.createElement("span");
        bar.className = "gantt-bar " + task.phase;
        bar.style.gridColumn = startSlot + " / span " + span;
        bar.setAttribute("aria-label", task.title + " from " + formatGanttLabel(taskStart) + " to " + formatGanttLabel(taskDue));

        track.appendChild(bar);
        row.appendChild(meta);
        row.appendChild(track);
        chart.appendChild(row);
    });

    root.replaceChildren(chart);
}

function parseGanttDate(dateText) {
    const parts = dateText.split("-").map(function (part) {
        return Number(part);
    });

    return new Date(parts[0], parts[1] - 1, parts[2]);
}

function formatGanttLabel(date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    });
}
