package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Story" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestStory extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "story";
    }

    @Test
    public void testStoryGood() throws Exception {
        runTest("story-fixture-good", true);
    }
}
