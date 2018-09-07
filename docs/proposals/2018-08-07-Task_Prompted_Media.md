# TASK-PROMPTED MEDIA

# Problem

Most compelling content includes more than one medium - text, photography, graphics, etc. 

In order to coordinate the production of this content, editors can create tasks to request collaboration from teams with different skills.

If the team decides to take on the work, they'll accept the task and dole out the assignment. 

At that point, the media is either created (the sidebar is written, the graphic is created) or sourced (an appropriate asset is found on the wires or in the archive). 

Now that the media exists, the editor who originally commissioned the work needs a way to easily locate it. This doesn't exist today within Arc. 

Allowing content creators to tag media with task IDs will make it easy to find work that is produced as the result of a task.

# Proposal

A new field, associated_tasks, will allow an array of Task IDs (strings) to be associated with any content inside of Arc. This new property will belong to `trait_taxonomy`


    "associated_tasks": {
      "description": "A list of task IDs that this content was created or curated to satisfy.",
      "type": "array",
      "items": {
        "type": "string"
      }

# Concerns

- Do we need to limit the number of task IDs that can be associated with a story? It is conceivable that a single photo, for example, is used to satsify many different tasks.

# Implementation

Jon Peterson on the Anglerfish team will implement this and add it to the schema if this proposal is accepted.  
