var renderOptions = {
    section: 'offerings'
};

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var opts = renderOptions;
    opts.title = 'What We Offer';
    res.render('docs/offerings/home', opts);
});

var offeringsHeadings = {
    ipads: {
        url: '/what-we-offer/ipads',
        relativeURL: "ipads",
        title: 'iPads'
    },
    office365: {
        url: '/what-we-offer/office365',
        relativeURL: "office365",
        title: "Office 365",
        subheads: [
            {
                title: "Kingsmen email",
                anchor: "#kingsmen-email"
            },
            {
                title: "Office applications",
                anchor: '#office-applications'
            }
        ]
    },
    renweb: {
        url: '/what-we-offer/renweb',
        relativeURL: 'renweb',
        title: 'RenWeb'
    },
    digitalTextbooks: {
        url: '/what-we-offer/digital-textbooks',
        relativeURL: "digital-textbooks",
        title: "Digital Textbooks"
    },
    digitalAssignmentSubmission: {
        url: '/what-we-offer/digital-assignment-submission',
        relativeURL: 'digital-assignment-submission',
        title: 'Digital Assignment Submission'
    },
    ipadSoftware: {
        url: '/what-we-offer/ipad-software',
        relativeURL: 'ipad-software',
        title: 'iPad Software'
    },
    appleClassroom: {
        url: '/what-we-offer/apple-classroom',
        relativeURL: 'apple-classroom',
        title: 'Apple Classroom'
    },
    managedAppleIDs: {
        url: '/what-we-offer/managed-apple-ids',
        relativeURL: 'managed-apple-ids',
        title: 'Managed Apple IDs'
    },
    naviance: {
        url: '/what-we-offer/naviance',
        relativeURL: 'naviance',
        title: 'Naviance'
    }
};

for (const heading in offeringsHeadings) {
    const headingObj = offeringsHeadings[heading];
    router.get('/' + headingObj.relativeURL, function (req, res) {
        var opts = renderOptions;
        opts.title = headingObj.title + ' - What We Offer';
        opts.heading = heading;
        opts.subheads = headingObj.subheads;
        opts.allHeadings = offeringsHeadings;
        res.render('docs/offerings/' + headingObj.relativeURL, opts);
    });
}

module.exports = router;