Images = new FS.Collection("images", {
        stores: [new FS.Store.GridFS("images")]
});

Projects = new Meteor.Collection('projects');
Projects.attachSchema(new SimpleSchema({
    illustration: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                label: 'Choose file'
            }
        }
    },
    title: {
        type: String,
        label: "title",
        max:1000
    },
    description: {
        type: String,
        label: "description",
        max:2500,
        autoform: {
            type: "textarea",
            rows: 6
        }
    },
    pictures: {
        type: [Object],
        optional : true,
        minCount: 1,
        maxCount: 6
    },
    "pictures.$.picture": {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                label: 'Choose file'
            }
        }
    },
    "pictures.$.pictureDescription": {
        type: String,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue:function(){ return this.userId }
    },
    createdAt: {
        type: Number,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue:function(){ return Date.now() }
    }
}));

News = new Meteor.Collection('news');
News.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "title",
        max:1000
    },
    description: {
        type: String,
        label: "description",
        max:2500,
        autoform: {
            type: "textarea",
            rows: 6
        }
    },
    pictures: {
        type: [Object],
        optional : true,
        minCount: 1,
        maxCount: 6
    },
    "pictures.$.picture": {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                label: 'Choose file'
            }
        }
    },
    "pictures.$.pictureDescription": {
        type: String,
        optional: true
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue:function(){ return this.userId }
    },
    projectId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            type: "hidden",
            label: false
        },
        defaultValue: ""
    },
    createdAt: {
        type: Number,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue:function(){ return Date.now() }
    }
}));


var userProfileSchema = new SimpleSchema({
    firstName : {
        type : String,
        max : 100,
        defaultValue : '',
        label: "firstName"
    },
    lastName : {
        type : String,
        max : 100,
        defaultValue : '',
        label: "lastName"
    },
    email : {
        type : String,
        regEx : SimpleSchema.RegEx.Email,
        optional : true,
        label: "email"
    },
    bio : {
        type: String,
        max:2500,
        autoform: {
            type: "textarea",
            rows: 6
        },
        optional : true,
        label: "bio"
    }

});

var userSchema = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Number,
        autoform: {
            type: "hidden",
            label: false
        },
        optional: true,
        autoValue:function(){ return Date.now() }
    },
    profile: {
        type: userProfileSchema,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: [String],
        optional: true
    }
});

Meteor.users.attachSchema(userSchema);

