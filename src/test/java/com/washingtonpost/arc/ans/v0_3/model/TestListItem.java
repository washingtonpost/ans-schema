package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a blockquote serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestListItem extends AbstractANSTest<ListItem> {

    @Override
    String getSchemaName() {
        return "list_item";
    }

    @Override
    Class getTargetClass() {
        return ListItem.class;
    }

    @Test
    public void testGood() throws Exception {
        testJsonValidation("item-fixture-good", true);
        ListItem item = testClassSerialization("item-fixture-good");
        assertThat(item.getId(), is("49876543210"));
        assertThat(item.getType(), is("item"));
        assertThat(item.getContent(), is("<i>Here's my html</i>"));
    }

    @Test
    public void testBad() throws Exception {
        testJsonValidation("item-fixture-bad", false);
    }

}
