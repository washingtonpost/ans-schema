package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static junit.framework.Assert.assertTrue;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a blockquote serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestOrderedList extends AbstractANSTest<OrderedList> {

    @Override
    String getSchemaName() {
        return "ordered_list";
    }

    @Override
    Class getTargetClass() {
        return OrderedList.class;
    }

    @Test
    public void testGoodSimple() throws Exception {
        testJsonValidation("ol-fixture-good", true);
        OrderedList ol = testClassSerialization("ol-fixture-good");
        assertThat(ol.getId(), is("49876543210"));
        assertThat(ol.getType(), is("ol"));
        assertThat(ol.getItems().size(), is(3));
    }

    @Test
    public void testGoodNested() throws Exception {
        testJsonValidation("ol-fixture-good-nested", true);
        OrderedList ol = testClassSerialization("ol-fixture-good-nested");
        assertThat(ol.getId(), is("49876543210"));
        assertThat(ol.getType(), is("ol"));
        assertThat(ol.getItems().size(), is(3));
        assertTrue(ol.getItems().get(2) instanceof OrderedList);
        assertThat(((OrderedList)ol.getItems().get(2)).getItems().size(), is(2));
    }


    @Test
    public void testBad() throws Exception {
        testJsonValidation("ol-fixture-bad", false);
    }

}
